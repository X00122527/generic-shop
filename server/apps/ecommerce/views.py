from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from apps.ecommerce.serializers import CartItemSerializer, CartSerializer
from apps.ecommerce.models import CartItems, Cart, Discount, ShippingPrice
from apps.product.models import Product
from notifications.signals import notify
from django.utils import timezone
from django.db.models import F, Sum
from django.db.models.functions import Cast

from rest_framework.generics import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from django.db.models import DecimalField

# class CartView(APIView):
#
#     def post(self, request):
#         serializer = CartSerializer(data=request.data, context={"request": request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def get(self, request):
#         instance = Cart.objects.get(user=request.user.id)
#         serializer = CartSerializer(instance, context={"request": request})
#         return Response(serializer.data, status=status.HTTP_200_OK)


class AddToCartView(APIView):
    def post(self, request):
        serializer = CartItemSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        instance = CartItems.objects.filter(cart_id=342342342)
        serializer = CartItemSerializer(instance, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CartUpdateView(APIView):
    def patch(self, request, itemId):
        print('in patch')
        instance = CartItems.objects.get(id=itemId)
        serializer = CartItemSerializer(instance=instance, data=request.data, partial=True, context={"request": request})

        new_qty = request.data['quantity']
        if new_qty == 0:
            if serializer.is_valid():
                serializer.save() # this is quite redundant since we are going to delete item anyway but left for front end ease
            instance.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)


        if serializer.is_valid():
            serializer.save()
            print(serializer.errors)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, itemId):
        cart_id = 342342342  # to do, get the session from request.session
        item = get_object_or_404(CartItems, pk=itemId, cart_id=cart_id)
        item.delete()

        return Response("Item remove from cart.", status=status.HTTP_200_OK)

class ShippingPriceView(APIView):

    def get(self, request, location):
        r = ShippingPrice.objects.get(country=location)
        if r:
            return Response(r.price.amount, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_404_NOT_FOUND)


class DiscountApplyView(APIView):

    def post(self, request):
        # we just discount code from the user
        # cart_id should be extracted from the jwt or userid
        # return: new subtotal OR message that the discount is expired
        try:
            discount = Discount.objects.get(code=request.data['code'])
            today = timezone.now()
            if discount and (discount.valid_from <= today and discount.valid_until >= today):
                total_sum = float(CartItems.objects.filter(cart_id=342342342).aggregate(
                    total_price=Sum(F('quantity') * F('product__price'))
                )['total_price'])
                after_discount = total_sum - (total_sum * (1 / 100 ))
                return Response(after_discount, status=status.HTTP_200_OK)
        except Discount.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

