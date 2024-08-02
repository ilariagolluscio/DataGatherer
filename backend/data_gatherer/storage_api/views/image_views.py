from storage_api.models.image_models import *

from storage_api.serializers.image_serializers import ImageSerializer, ImgCropSerializer
from django_filters import rest_framework as filters

from storage_api.views.common.common_views import CompleteModelViewSet


class ImageViewSet(CompleteModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'isDataGathered']


class ImgCropViewSet(CompleteModelViewSet):
    queryset = ImgCrop.objects.all()
    serializer_class = ImgCropSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['image', 'fieldName', 'isDefault']

    def create(self, request, *args, **kwargs):
        img_id = request.data['image']
        field_name = request.data['fieldName']

        ImgCrop.objects.filter(image_id=img_id).filter(fieldName=field_name).delete()

        return super().create(request, *args, **kwargs)


