from rest_framework import serializers
from apps.product.models import Product, ProductImage, ProductOption1, ProductOption2
from django.db import transaction
from easy_thumbnails.files import get_thumbnailer

thumbnail_options = {
	'size': (350, 350), 'crop': True
}

class ProductOption1Serializer(serializers.ModelSerializer):
	class Meta:
		model = ProductOption1
		fields = ['option']


class StockSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductOption1
		fields = "__all__"


class ProductOption2Serializer(serializers.ModelSerializer):
	class Meta:
		model = ProductOption2
		fields = ['option']


class ProductThumbnailSerializer(serializers.ModelSerializer):

	thumbnail_url = serializers.SerializerMethodField()

	class Meta:
		model = ProductImage
		fields = ["image", "thumbnail_url"]

	def get_thumbnail_url(self, instance):
		return get_thumbnailer(instance.image).get_thumbnail(thumbnail_options).url


class ProductImageSerializer(serializers.ModelSerializer):
	# thumbnail = serializers.SerializerMethodField()

	class Meta:
		model = ProductImage
		fields = ["id", "product", "image", "order"]  # "thumbnail"

	# def get_thumbnail(self, instance):
	# 	return get_thumbnailer(instance.image).get_thumbnail(thumbnail_options).url


class ProductSerializer(serializers.ModelSerializer):
	images = ProductImageSerializer(many=True, read_only=True)
	option_1 = serializers.SerializerMethodField()
	option_2 = serializers.SerializerMethodField()
	stock_option = StockSerializer(many=True, read_only=True, source='option_1')

	# option_2 = ProductOption2Serializer(many=True, read_only=True).data

	class Meta:
		model = Product
		fields = ('id', 'title', 'item_type', 'description', 'created_on', 'price_currency', 'price', 'quantity',
				  'status', 'images', 'option_1', 'option_2', 'stock_option')

	def get_option_1(self, product):
		return list(set(product.option_1.values_list('option_1', flat=True)))

	def get_option_2(self, product):
		return list(set(product.option_1.values_list('option_2', flat=True)))


class ProductsSerializer(serializers.ModelSerializer):
	images = ProductThumbnailSerializer(many=True, read_only=True)

	class Meta:
		model = Product
		fields = ('id', 'title', 'price_currency', 'price', 'images')

