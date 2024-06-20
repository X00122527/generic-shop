from django.urls import path, include
from apps.product.views import ProductView, ProductsView

urlpatterns = [
    path('products', ProductsView.as_view(), name='products'),
    path('products/<int:productId>', ProductView.as_view(), name='product'),

]