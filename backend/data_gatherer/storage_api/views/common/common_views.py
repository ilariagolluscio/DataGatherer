from rest_framework import viewsets, permissions, status, views as rf_views, generics as rf_generics
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet


class ReadOnlyBaseModelViewSet(mixins.RetrieveModelMixin,
                               mixins.ListModelMixin,
                               GenericViewSet):
    pagination_class = None


class OpenAccessReadOnlyBaseModelViewSet(mixins.RetrieveModelMixin,
                                         mixins.ListModelMixin,
                                         GenericViewSet):
    pagination_class = None


class CompleteModelViewSet(mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.ListModelMixin,
                           mixins.DestroyModelMixin,
                           GenericViewSet):
    pagination_class = None
