from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from apps.ecommerce.serializers import CartItemSerializer, CartSerializer
from apps.ecommerce.models import CartItems, Cart
from apps.product.models import Product
from notifications.signals import notify
from apps.user.models import User

class CartView(APIView):

    def post(self, request):
        serializer = CartSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        instance = Cart.objects.get(user=request.user.id)
        serializer = CartSerializer(instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToCartView(APIView):
    def post(self, request):
        serializer = CartItemSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        instance = Cart.objects.get(user=request.user.id)
        serializer = CartItemSerializer(instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)