from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from apps.product.serializers import ProductSerializer
from apps.product.models import Product
from notifications.signals import notify
from apps.user.models import User
from rest_framework.generics import ListAPIView
from apps.product.models import Status_Choices

class ProductView(APIView):

    def get(self, request, productId):
        instance = Product.objects.get(id=productId)
        serializer = ProductSerializer(instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductsView(ListAPIView):

    queryset = Product.objects.filter(status=1)  # can we make use of Status_Choices ?
    serializer_class = ProductSerializer
