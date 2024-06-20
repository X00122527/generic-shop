from rest_framework import serializers
from apps.product.models import Product, ProductImage, ProductOption1, ProductOption2
from django.db import transaction

class ProductOption1Serializer(serializers.ModelSerializer):
	class Meta:
		model = ProductOption1
		fields = ['option']


class ProductOption2Serializer(serializers.ModelSerializer):
	class Meta:
		model = ProductOption2
		fields = ['option']


class ProductImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductImage
		fields = ["id", "product", "image", "order"]


class ProductSerializer(serializers.ModelSerializer):
	images = ProductImageSerializer(many=True, read_only=True)
	option_1 = serializers.SerializerMethodField()
	option_2 = serializers.SerializerMethodField()

	# option_2 = ProductOption2Serializer(many=True, read_only=True).data

	class Meta:
		model = Product
		fields = ('id', 'title', 'item_type', 'description', 'created_on', 'price_currency', 'price', 'quantity',
				  'status', 'images', 'option_1', 'option_2')

	def get_option_1(self, product):
		return list(set(product.option_1.values_list('option_1', flat=True)))

	def get_option_2(self, product):
		return list(set(product.option_1.values_list('option_2', flat=True)))