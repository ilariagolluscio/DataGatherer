from storage_api.models.project_models import *

from storage_api.serializers.project_serializers import ProjectSerializer
from django_filters import rest_framework as filters

from storage_api.views.common.common_views import CompleteModelViewSet


class ProjectViewSet(CompleteModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = []


