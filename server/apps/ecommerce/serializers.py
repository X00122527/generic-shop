from rest_framework import serializers
from apps.ecommerce.models import Cart, CartItems, Discount
from django.db import transaction
from easy_thumbnails.files import get_thumbnailer

thumbnail_options = {
	'size': (200, 200), 'crop': True
}

class DiscountSerializer(serializers.ModelSerializer):
	class Meta:
		model = Discount
		fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cart
		fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
	title = serializers.CharField(source='product.title', read_only=True)
	price = serializers.FloatField(source='product.price.amount', read_only=True)
	currency = serializers.CharField(source='product.price.currency', read_only=True)
	image = serializers.ImageField(source='product.images.main_image.image', read_only=True)
	# cart_item_count = serializers.SerializerMethodField(read_only=True)
	thumbnail_url = serializers.SerializerMethodField(read_only=True)
	class Meta:
		model = CartItems
		fields = ["id", "quantity", "option_1", "option_2", "product", "title", "price", "image", "currency", "thumbnail_url"]

	# def get_cart_item_count(self, instance):
	# 	return CartItems.objects.filter(cart_id=instance.cart.cart_id).count()

	def get_thumbnail_url(self, instance):
		product_img = instance.product.images.main_image() # p.product.images.main_image().image
		url = get_thumbnailer(product_img.image).get_thumbnail(thumbnail_options).url
		return url

	@transaction.atomic
	def create(self, validated_data):
		request = self.context['request']
		# need to check if Cart instance already exists and if not create it - this isn't the best spot for that...
		if request.user.id: # todo
			obj, created = Cart.objects.get_or_create(
				# cart_id=342342342,
				user_id=request.user.id
			)
		else:
			obj, created = Cart.objects.get_or_create(
				cart_id= self.context['cart_id']  #request.data['cart_id'],
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

