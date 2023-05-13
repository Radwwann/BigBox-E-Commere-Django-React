
from django.urls import path, include 
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('api/', include(('api.urls', 'api'), namespace='api')),
    path('admin/', admin.site.urls),
    path('', include('shop.urls', namespace='shop')),
    path('registration/', include('registration.urls', namespace='registration')),
    path('order/', include('order.urls', namespace='order')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
