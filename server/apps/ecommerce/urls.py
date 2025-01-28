from django.urls import path, include
from apps.ecommerce.views import CartUpdateView, CartView, DiscountApplyView, ShippingPriceView, CartSessionView

urlpatterns = [
    # path('carts', CartView.as_view(), name='create-cart'),  # POST, DELETE(?) | create a cart - though I'm not sure when it should be used
    # path('carts/:cartId', CartView.as_view(), name='view-cart'),  # GET | retrieve cart's contents
    path('carts/<uuid:cart_id>/items/<int:item_id>', CartUpdateView.as_view(), name='update-cart'), # POST, PATCH, DELETE | {"product": x, "qty": x, "option_1": y...}
    path('carts/<str:cart_id>', CartView.as_view(), name='item-cart'),
    path('apply-discount', DiscountApplyView.as_view(), name='apply-discount'),
    path('shipping-price/<str:location>', ShippingPriceView.as_view(), name='shipping-price'),
    path('carts-session', CartSessionView.as_view(), name='carts-session')
]