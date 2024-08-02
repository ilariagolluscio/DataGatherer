from django.urls import path

from functions_api.functions.extend_network_from_image.views import ExtendNetworkFromImageView
from functions_api.functions.save_reviewed_text.views import SaveReviewedTextView
from functions_api.functions.upload_pictures import fx_urls as upload_pics_urls
from functions_api.functions.use_default_crop.views import UseDefaultCropView
from django.urls import path, include


urlpatterns = [
    path('up/', include(upload_pics_urls)),
    path('default_crop/', UseDefaultCropView.as_view(), name='use_default_crop_view'),
    path('save_reviewed_text/', SaveReviewedTextView.as_view(), name="save_reviewed_text"),
    path('extend/', ExtendNetworkFromImageView.as_view(), name='extend_network_from_img')
]