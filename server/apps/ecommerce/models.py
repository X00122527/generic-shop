from django.db import models
from apps.product.models import Product
from apps.user.models import User
from djmoney.models.fields import MoneyField
# Create your models here.


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    created_on = models.DateTimeField(auto_now_add=True)


class CartItems(models.Model):
    order = models.ForeignKey(Cart, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(default=1, max_length=2)
    created_on = models.DateTimeField(auto_now_add=True)
