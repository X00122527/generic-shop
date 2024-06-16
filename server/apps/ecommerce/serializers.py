from rest_framework import serializers
from apps.ecommerce.models import Cart, CartItems
from django.db import transaction

class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cart
		fields = "__all__"



class CartItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = CartItems
		fields = ["quantity", "option_1", "option_2", "product"]

	@transaction.atomic
	def create(self, validated_data):
		request = self.context['request']
		print(request.session.keys())
		print(validated_data)
		# need to check if Cart instance already exists and if not create it - this isn't the best spot for that...
		obj, created = Cart.objects.get_or_create(
			cart_id=342342342,
			user_id=request.user.id
		)
		validated_data['cart_id'] = obj.cart_id
		# have to check if such item in the cart already exists, if so update it instead of creating
		instance = CartItems.objects.filter(cart_id=validated_data['cart_id'],
										 product=validated_data['product'],
										 option_1=validated_data['option_1'],
										 option_2=validated_data['option_2']).first()
		if instance:
			print(f'instance for this product was found, will try to increase qty from {instance.quantity} to {instance.quantity + validated_data["quantity"]}')
			validated_data['quantity'] = instance.quantity + validated_data['quantity']
			item = super().update(instance, validated_data)
		else:
			item = super().create(validated_data)

		return item

