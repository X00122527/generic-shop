from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from apps.product.serializers import ProductSerializer, ProductsSerializer
from apps.product.models import Product
from notifications.signals import notify
from apps.user.models import User
from rest_framework.generics import ListAPIView
from apps.product.models import Status_Choices
from rest_framework.permissions import AllowAny,  IsAuthenticated
from rest_framework.pagination import PageNumberPagination,BasePagination,LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilter

class MyCustomPagination(LimitOffsetPagination):
    default_limit = 20
    limit_query_param = 'limit'
    offset_query_param = 'offset'
    max_limit = 100

class ProductView(APIView):

    def get(self, request, productId):
        instance = Product.objects.get(id=productId)
        serializer = ProductSerializer(instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductsView(ListAPIView):

    queryset = Product.objects.filter(status=1)  # can we make use of Status_Choices ?
    serializer_class = ProductsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    permission_classes = [AllowAny]
    pagination_class = MyCustomPagination




