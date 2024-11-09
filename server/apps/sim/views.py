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
from apps.user.models import User
from apps.sim.serializers import SSOLoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.user.serializers import (
LoginSerializer,
)
from rest_framework.permissions import AllowAny,  IsAuthenticated


# taken from https://www.photondesigner.com/articles/google-sign-in

def sign_in(request):
    return render(request, 'sign_in.html')


class AuthReceiverView(TokenObtainPairView):
    serializer_class = SSOLoginSerializer

def sign_out(request):
    del request.session['user_data']
    return redirect('sign_in')