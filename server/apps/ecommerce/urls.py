from django.urls import path, include
from apps.ecommerce.views import

urlpatterns = [
    path('order', OrderView.as_view(), name='order'),

]