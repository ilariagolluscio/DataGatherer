from rest_framework import serializers

from storage_api.models.image_models import Image, ImgCrop
from storage_api.models.project_models import Project


class Serializer(serializers.Serializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())