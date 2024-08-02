from rest_framework import serializers

from storage_api.models.image_models import Image
from storage_api.models.project_models import Project


class Serializer(serializers.Serializer):
    targetImage = serializers.PrimaryKeyRelatedField(queryset=Image.objects.all())