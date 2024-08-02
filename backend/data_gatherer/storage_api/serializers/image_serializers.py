from rest_framework import serializers
from storage_api.models.image_models import *


class ImageSerializer(serializers.ModelSerializer):
    image_file_url = serializers.SerializerMethodField()

    def get_image_file_url(self, obj: Image):
        return obj.imagefile.file.url

    class Meta:
        model = Image
        fields = '__all__'


class ImgCropSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgCrop
        fields = '__all__'
