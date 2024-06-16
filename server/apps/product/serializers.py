from rest_framework import serializers
from apps.product.models import Product
from django.db import transaction

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = "__all__"