from django.db import models
from apps.product.models import Product
from apps.user.models import User
from djmoney.models.fields import MoneyField
import uuid

class Cart(models.Model):
    # cart_id = models.BigAutoField(verbose_name="cart id", primary_key=True)
    cart_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # aka session id
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)


class CartItems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=False, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(default=1)
    option_1 = models.CharField(max_length=100)
    option_2 = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)

class Discount(models.Model):
    code = models.CharField(max_length=100)
    discount = models.IntegerField()
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()

class DiscountItems(models.Model): # optional
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)


class ShippingPrice(models.Model):
    country = models.CharField(max_length=100)
    min_weight = models.DecimalField(max_digits=5, decimal_places=0)
    max_weight = models.DecimalField(max_digits=5, decimal_places=0)
    price = MoneyField(max_digits=5, decimal_places=2, default_currency='USD', default=0)

    def is_within_range(self, value):
        return self.min_value <= value <= self.max_value
