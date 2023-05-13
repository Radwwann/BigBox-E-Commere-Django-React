from django.urls import path
from . import views
from BIGBOX import settings
from django.contrib.auth import logout

app_name = 'api'

urlpatterns = [
    path('logout/',
         logout, {'next_page': settings.LOGOUT_REDIRECT_URL}, name='logout'),
    path('p/',
         views.getProduct, name="all-products"),
    path('getuserid/',
         views.getUserId, name="get user id"),
    path('aow/',
         views.getAreaOfWork, name="get area of work"),
    path('slides/',
         views.getSlides, name="slides"),
    path('role/',
         views.getUserRole, name="role"),
    path('single/<int:pk>',
         views.getProductByID, name="single-product"),
    path('createorder/',
         views.createOrder, name="createorder"),
    path('categories/',
         views.getCategories, name="get categories"),
    path('brands/',
         views.getBrands, name="brands"),
    path('cart/',
         views.getCart, name="cart-products"),
    path('areaofwork/<str:aow>/',
         views.filterByAOW, name="area-of-work"),
    path('products/<int:max_price>&<int:min_price>/',
         views.rangeProduct, name="products-range"),
    path('postreview/',
         views.postReview, name="post review"),
    path('reviewsbyitem/<int:item_id>/',
         views.getReviewByItem, name="reviews by item "),
    path('reviewsbyuser/',
         views.getReviewByUser, name="user reviews"),
    path('brands/<str:brand_name>/',
         views.filterByBrand, name="brand-products"),
    path('category/<str:category_name>/',
         views.filterByCategory, name="category-products"),
    path('search/<str:query>/',
         views.rangeProduct, name="search-products"),
    path('orders/',
         views.getUserOrders, name="get user orders"),
]
