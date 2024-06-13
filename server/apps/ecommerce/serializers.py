from rest_framework import serializers
from apps.ecommerce.models import Cart, CartItems


class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cart
		fields = "__all__"

class CartItemsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cart
		fields = "__all__"