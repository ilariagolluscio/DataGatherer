from rest_framework.viewsets import GenericViewSet

from storage_api.models.data_models import *
from storage_api.views.common.common_views import OwnedInstancesCompleteModelViewSet
from storage_api.serializers.data_serializers import HashtagSerializer, IGUserSerializer, \
    UserHashtagUseSerializer
from django_filters import rest_framework as filters


class HashtagViewSet(OwnedInstancesCompleteModelViewSet):
    queryset = Hashtag.objects.none()
    serializer_class = HashtagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'createdFromImage']


class IGUserViewSet(OwnedInstancesCompleteModelViewSet):
    queryset = IGUser.objects.none()
    serializer_class = IGUserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'createdFromImage']


class UserHashtagUseViewSet(OwnedInstancesCompleteModelViewSet):
    queryset = UserHashtagUse.objects.none()
    serializer_class = UserHashtagUseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'image']