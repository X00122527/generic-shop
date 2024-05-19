# Generated by Django 4.2.13 on 2024-05-19 00:43

import apps.product.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("item_type", models.CharField(max_length=20)),
                ("description", models.CharField(max_length=255)),
                ("status", models.CharField(max_length=100)),
                ("created_on", models.DateTimeField(auto_now_add=True)),
                ("updated_on", models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="ProductImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        upload_to=apps.product.models.upload_to_product_folder
                    ),
                ),
                ("order", models.IntegerField()),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="product.product",
                        verbose_name="Product Image",
                    ),
                ),
            ],
        ),
    ]
