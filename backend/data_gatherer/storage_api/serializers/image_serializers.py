from rest_framework import serializers
from storage_api.models.image_models import *


class ImageSerializer(serializers.ModelSerializer):
    image_file_url = serializers.SerializerMethodField()
    is_similar_to_user_id = serializers.SerializerMethodField()

    def get_is_similar_to_user_id(self, obj:Image):
        if obj.isSimilarTo is None: return None
        return obj.isSimilarTo.userId

    def get_image_file_url(self, obj: Image):
        return obj.file.url

    class Meta:
        model = Image
        fields = '__all__'


class ImgDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgData
        fields = '__all__'


class ImgCropSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgCrop
        fields = '__all__'
