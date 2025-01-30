from rest_framework import viewsets, permissions, status, views as rf_views, generics as rf_generics
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from storage_api.serializers.data_serializers import HashtagSerializer


class ReadOnlyBaseModelViewSet(mixins.RetrieveModelMixin,
                               mixins.ListModelMixin,
                               GenericViewSet):
    pagination_class = None


class OpenAccessReadOnlyBaseModelViewSet(mixins.RetrieveModelMixin,
                                         mixins.ListModelMixin,
                                         GenericViewSet):
    pagination_class = None


class OwnedInstancesCompleteModelViewSet(mixins.CreateModelMixin,
                                         mixins.RetrieveModelMixin,
                                         mixins.UpdateModelMixin,
                                         mixins.ListModelMixin,
                                         mixins.DestroyModelMixin,
                                         GenericViewSet):
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return self.queryset.model.objects.filter(author=user)