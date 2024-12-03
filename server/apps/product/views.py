from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.product.serializers import ProductSerializer, ProductsSerializer
from apps.product.models import Product
from apps.product.paginations import PageNumberPagination, OffsetPagination
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny,  IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter

from .filters import ProductFilter, CustomProductOrderingFilter


class ProductView(APIView):

    def get(self, request, productId):
        instance = Product.objects.get(id=productId)
        serializer = ProductSerializer(instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductsView(ListAPIView):

    queryset = Product.objects.filter(status=1)  # can we make use of Status_Choices ?
    serializer_class = ProductsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, CustomProductOrderingFilter]
    filterset_class = ProductFilter
    permission_classes = [AllowAny]
    search_fields = ['title']
    pagination_class = PageNumberPagination
    ordering_fields = ['price', 'created_on']
    ordering = ['-created_on']




