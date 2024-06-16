from django.urls import path, include
from apps.ecommerce.views import CartView, AddToCartView

urlpatterns = [
    # path('carts', CartView.as_view(), name='create-cart'),  # POST, DELETE(?) | create a cart - though I'm not sure when it should be used
    # path('carts/:cartId', CartView.as_view(), name='view-cart'),  # GET | retrieve cart's contents
    # path('carts/<int:productId>/items', AddToCartView.as_view(), name='item-cart'), # POST, PATCH, DELETE | {"product": x, "qty": x, "option_1": y...}
    path('carts', AddToCartView.as_view(), name='item-cart'),
]