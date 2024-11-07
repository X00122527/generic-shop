from django.contrib import admin
from apps.ecommerce.models import Discount, DiscountItems, ShippingPrice
# Register your models here.
admin.site.register([Discount, DiscountItems, ShippingPrice])