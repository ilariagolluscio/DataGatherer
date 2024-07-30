from django.urls import path
from functions_api.functions.upload_pictures import fx_urls
from django.urls import path, include

urlpatterns = [
    path('up/', include(fx_urls))
]