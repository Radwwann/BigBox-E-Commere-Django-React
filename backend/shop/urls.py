
from django.urls import path

from .views import  brand_product_list, home_page,search,policy
app_name= 'shop'
urlpatterns = [
    path('', home_page, name = 'home_page'),
    path('search',search,name='search'),
     path('brand/<int:brand_id>/', brand_product_list, name='brand_product_list'),
 path('shippingpolicy',policy,name='shipping_policy'),
]
