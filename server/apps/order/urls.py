from django.urls import path, include
from apps.order.views import OrderView

urlpatterns = [
    path('order', OrderView.as_view(), name='order'),

]