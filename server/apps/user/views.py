from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny,  IsAuthenticated
from apps.user.models import User
from apps.user.serializers import (
	UserSerializer, LoginSerializer, SignupSerializer, ChangePasswordSerializer
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import mixins
from rest_framework import generics
# Create your views here.

class UpdatePassword(UpdateAPIView):
	permission_classes =[IsAuthenticated]
	serializer_class = ChangePasswordSerializer
	queryset = User.objects.all()


class LoginApiView(TokenObtainPairView):
	permission_classes = [AllowAny]
	serializer_class = LoginSerializer

class SignupApiView(CreateAPIView):
	permission_classes = [AllowAny]
	queryset = User.objects.all()
	serializer_class = SignupSerializer

class UserApiView(APIView):
	def get(self, request):
		u = User.objects.get(pk=request.user.id)
		serializer = UserSerializer(u, many=False)
		return Response(serializer.data)

