from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuidfield import ShortUUIDField

SSO_ALLOWED = ['facebook', 'google']

class User(AbstractUser):
	userId = ShortUUIDField()
	site = models.CharField(max_length=50, blank=True, null=True)  # sso source

	def save(self, *args, **kwargs):
		if self.site in SSO_ALLOWED and not self.password:
			self.set_unusable_password()  # Marks the password as unusable
		super().save(*args, **kwargs)

class UserAddress(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='address', null=True)
	line_1 = models.CharField(max_length=255)
	line_2 = models.CharField(max_length=255)
	city = models.CharField(max_length=255)
	post_code = models.CharField(max_length=255)
	country = models.CharField(max_length=255)