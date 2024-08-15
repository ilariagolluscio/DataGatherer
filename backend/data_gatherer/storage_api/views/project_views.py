from rest_framework import status
from rest_framework.response import Response

from storage_api.models.project_models import *

from storage_api.serializers.project_serializers import *
from django_filters import rest_framework as filters

from storage_api.views.common.common_views import CompleteModelViewSet


class ProjectViewSet(CompleteModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = []


class ProjectDefaultCropViewSet(CompleteModelViewSet):
    queryset = ProjectDefaultCrop.objects.all()
    serializer_class = ProjectDefaultCropSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['project', 'fieldName']

    def create(self, request, *args, **kwargs):
        serializer:ProjectDefaultCropSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=False)

        img_crop = ImgCrop.objects.get(pk=serializer.data['imgCrop'])

        correct_field_name = img_crop.fieldName

        queryset = ProjectDefaultCrop.objects.filter(
            project_id=serializer.data['project'],
            fieldName=correct_field_name
        )

        queryset.delete()

        serializer = self.get_serializer(data={
            'project': serializer.data['project'],
            'imgCrop': serializer.data['imgCrop'],
            'fieldName': correct_field_name
        })

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




