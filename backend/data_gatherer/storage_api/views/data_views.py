from storage_api.models.data_models import *
from storage_api.views.common.common_views import CompleteModelViewSet
from storage_api.serializers.data_serializers import ImgDataSerializer, HashtagSerializer, IGUserSerializer, \
    UserHashtagUseSerializer
from django_filters import rest_framework as filters


class HashtagViewSet(CompleteModelViewSet):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'createdFromImage']


class IGUserViewSet(CompleteModelViewSet):
    queryset = IGUser.objects.all()
    serializer_class = IGUserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'createdFromImage']


class UserHashtagUseViewSet(CompleteModelViewSet):
    queryset = UserHashtagUse.objects.all()
    serializer_class = UserHashtagUseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'image']



