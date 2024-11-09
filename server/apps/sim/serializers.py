from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from google.auth.transport import requests
from google.oauth2 import id_token
import os
from apps.user.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class SSOLoginSerializer(TokenObtainPairSerializer):
    credential = serializers.CharField(write_only=True, required=True)
    site = serializers.CharField(write_only=True, required=False)

    def __init__(self, *args, **kwargs):
        # Override fields to include only sso_token
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None)
        self.fields.pop('password', None)

    @classmethod
    def get_token(cls, user):
        return super().get_token(user)

    def validate(self, attrs):
        print('in validate')
        token = attrs.pop("credential")
        site = attrs.pop("site")  # sso provider
        if site not in ['facebook', 'google']:
            raise serializers.ValidationError("Invalid SSO source")
        sso_response = id_token.verify_oauth2_token(
            token, requests.Request(), os.environ['GOOGLE_OAUTH_CLIENT_ID']
        )

        if not sso_response or sso_response == '':
            raise serializers.ValidationError("Invalid SSO token")

        user_data = sso_response # .json()
        email = user_data.get("email")
        # Retrieve or create user
        user, _ = User.objects.get_or_create(email=email, defaults={
            "username": email.split('@')[0],
            "site": site
            # "first_name": user_data.get("given_name"),
            # "last_name": user_data.get("family_name"),
        })

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
