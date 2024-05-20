from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from apps.order.serializer import OrderSerializer
from apps.order.models import Order

class OrderView(APIView):

    def post(self, request):
        serializer = OrderSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        instance = Order.objects.get(user=request.user.id)
        serializer = OrderSerializer(instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)