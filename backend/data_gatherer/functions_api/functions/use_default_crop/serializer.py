from rest_framework import serializers

from storage_api.models.image_models import Image


class Serializer(serializers.Serializer):
    fieldName = serializers.CharField()
    targetImage = serializers.PrimaryKeyRelatedField(queryset=Image.objects.all())

