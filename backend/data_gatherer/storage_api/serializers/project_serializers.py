from rest_framework import serializers

from storage_api.models.image_models import Image
from storage_api.models.project_models import *


class ProjectSerializer(serializers.ModelSerializer):
    are_all_images_analyzed = serializers.SerializerMethodField()
    next_image_to_analyze = serializers.SerializerMethodField()

    def get_are_all_images_analyzed(self, obj:Project):
        return Image.objects.filter(project=obj, isDataGathered=False).count() == 0

    def get_next_image_to_analyze(self, obj:Project):
        data = Image.objects.filter(project=obj, isDataGathered=False).last()
        if data is None:
            return None
        return data.id

    class Meta:
        model = Project
        fields = '__all__'
        

