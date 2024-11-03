import os
from rest_framework.views import APIView
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
from rest_framework.response import Response
from rest_framework import status
from apps.user.serializers import SignupSerializer


# taken from https://www.photondesigner.com/articles/google-sign-in

def sign_in(request):
    return render(request, 'sign_in.html')


class AuthReceiverView(APIView):
    """
    Google calls this URL after the user has signed in with their Google account.
    """

    def post(self, request):
        token = request.data['credential']

        try:
            user_data = id_token.verify_oauth2_token(
                token, requests.Request(), os.environ['GOOGLE_OAUTH_CLIENT_ID']
            )
        except ValueError:
            return HttpResponse(status=403)

        # In a real app, I'd also save any new user here to the database. See below for a real example I wrote for Photon Designer.
        # You could also authenticate the user here using the details from Google (https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in)

        serializer = SignupSerializer(data=user_data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        # request.session['user_data'] = user_data
        x = serializer.errors
        return Response("Valid auth.", status=status.HTTP_200_OK)


def sign_out(request):
    del request.session['user_data']
    return redirect('sign_in')