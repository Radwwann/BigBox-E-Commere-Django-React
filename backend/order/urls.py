from django.urls import path
from .views import remove_from_cart, shopping_cart, add_to_cart, update_cart_item_quantity

app_name = 'order'

urlpatterns = [
    path('shopping-cart/', shopping_cart, name='shopping_cart'),
    path('add-to-cart/<int:product_id>/', add_to_cart, name='add_to_cart'),
    path('remove-from-cart/<int:product_id>/', remove_from_cart, name='remove_from_cart'),
    path('update-cart-item-quantity/<int:product_id>/', update_cart_item_quantity, name='update_cart_item_quantity'),
    ]
