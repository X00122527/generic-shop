from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuidfield import ShortUUIDField


class User(AbstractUser):
	userId = ShortUUIDField()


class UserAddress(models.Model):
	line_1 = models.CharField(max_length=255),
	line_2 = models.CharField(max_length=255),
	city = models.CharField(max_length=255),
	post_code = models.CharField(max_length=255),
	country = models.CharField(max_length=255)