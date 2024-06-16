from django.urls import path, include
from apps.product.views import ProductView, ProductsView

urlpatterns = [
    path('products/<int:productId>', ProductView.as_view(), name='product'),
    path('products/', ProductsView.as_view(), name='product'),

]