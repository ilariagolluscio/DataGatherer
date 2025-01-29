from rest_framework.viewsets import GenericViewSet

from storage_api.models.data_models import *
from storage_api.views.common.common_views import CompleteModelViewSet
from storage_api.serializers.data_serializers import HashtagSerializer, IGUserSerializer, \
    UserHashtagUseSerializer
from django_filters import rest_framework as filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, mixins


# TODO: Test user mechanism

class HashtagViewSet(mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Hashtag.objects.none()
    serializer_class = HashtagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'createdFromImage']

    def get_queryset(self):
        user = self.request.user
        return Hashtag.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class IGUserViewSet(CompleteModelViewSet):
    queryset = IGUser.objects.none()
    permission_classes = [IsAuthenticated]
    serializer_class = IGUserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'createdFromImage']

    def get_queryset(self):
        user = self.request.user
        return IGUser.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserHashtagUseViewSet(CompleteModelViewSet):
    queryset = UserHashtagUse.objects.none()
    permission_classes = [IsAuthenticated]
    serializer_class = UserHashtagUseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'image']

    def get_queryset(self):
        user = self.request.user
        return UserHashtagUse.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
