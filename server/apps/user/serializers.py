from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from apps.user.models import User, UserAddress

class UserAddressSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserAddress
		fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
	address = UserAddressSerializer(many=False, read_only=True)

	class Meta:
		model = User
		fields = ['id', 'first_name', 'last_name', 'email', 'username', 'address']


class LoginSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)
		token['userId'] = user.id
		return token

class ChangePasswordSerializer(serializers.ModelSerializer):
	currentPassword = serializers.CharField(write_only=True, required=True)
	password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

	class Meta:
		model = User
		fields = ['password', 'currentPassword']


	def update(self, instance, validated_data):
		result = instance.check_password(validated_data['currentPassword'])
		if not result:
			print("password not matching, returning unchanged object")
			raise Exception("Incorrect password.")
			# return instance  # not sure if returning just an instance is ok but how can we return this as some sort of message
		instance.set_password(validated_data['password'])
		instance.save()
		return instance

class SignupSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
		required=True,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
	password = serializers.CharField(
		write_only=True, required=True, validators=[validate_password]
	)
	passwordTwo = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = User
		fields = (
			'email', 'password', 'passwordTwo'
		)
		extra_kwargs = {
			'email': {'required': True},
			'password': {'required': True},
		}

	def validate(self, attrs):
		if attrs['password'] != attrs['passwordTwo']:
			raise serializers.ValidationError(
				{"password": "Password fields didn't match."}
			)
		return attrs

	@transaction.atomic
	def create(self, validated_data):
		print(validated_data)
		try:
			user = User.objects.create(
				username=validated_data['email'],
				email=validated_data['email'],
			)
		except Exception as ex:
			print(ex)
			raise serializers.ValidationError(
				{"message": ex})

		user.set_password(validated_data['password'])
		user.save()

		return user

class GoogleSignupSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
		required=True,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
	password = serializers.CharField(
		write_only=True, required=True, validators=[validate_password]
	)
	passwordTwo = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = User
		fields = (
			'email', 'password', 'passwordTwo'
		)
		extra_kwargs = {
			'email': {'required': True},
			'password': {'required': True},
		}

	def validate(self, attrs):
		if attrs['password'] != attrs['passwordTwo']:
			raise serializers.ValidationError(
				{"password": "Password fields didn't match."}
			)
		return attrs

	@transaction.atomic
	def create(self, validated_data):
		print(validated_data)
		try:
			user = User.objects.create(
				username=validated_data['email'],
				email=validated_data['email'],
			)
		except Exception as ex:
			print(ex)
			raise serializers.ValidationError(
				{"message": ex})

		user.set_password(validated_data['password'])
		user.save()

		return user