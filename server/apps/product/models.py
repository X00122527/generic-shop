from django.db import models
from djmoney.models.fields import MoneyField


def upload_to_product_folder(instance, file_name):
    return '/'.join(['product', str(instance.product.id), file_name])


class ProductImageManager(models.Manager):
    def main_image(self):
        return self.get(order=1)


class Item_Type_Choices(models.TextChoices):
    TEE = "1", "T-SHIRT",
    HOD = "2", "HOODIE",
    PAN = "3", "PANTALONES",
    HAT = "4", "HAT",


class Status_Choices(models.TextChoices):
    ACT = "1", "ACTIVE",
    INAC = "2", "INACTIVE",


class Product(models.Model):
    title = models.CharField(max_length=255)
    item_type = models.CharField(max_length=10, choices=Item_Type_Choices.choices)
    description = models.CharField(max_length=255)
    price = MoneyField(max_digits=5, decimal_places=2, default_currency='USD', default=0)
    status = models.CharField(max_length=10, blank=False, null=False, choices=Status_Choices.choices)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    @property
    def get_status(self):
        return Status_Choices(self.status).label

    @property
    def get_item_type(self):
        return Item_Type_Choices(self.item_type).label


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", verbose_name="Product Image",
                                on_delete=models.CASCADE, null=False, blank=False)
    image = models.ImageField(upload_to=upload_to_product_folder, null=False, blank=False)
    order = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = ProductImageManager()