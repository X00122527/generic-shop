from django.db import models
from apps.product.models import Product
from apps.user.models import User
from djmoney.models.fields import MoneyField


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    total = MoneyField(max_digits=8, decimal_places=2, default_currency='USD', null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)


class OrderList(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    created_on = models.DateTimeField(auto_now_add=True)