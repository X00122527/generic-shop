from django.db import models
from apps.product.models import Product
from apps.user.models import User
from djmoney.models.fields import MoneyField
# Create your models here.


class Cart(models.Model):
    cart_id = models.BigAutoField(verbose_name="cart id", primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)


class CartItems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=False)
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
