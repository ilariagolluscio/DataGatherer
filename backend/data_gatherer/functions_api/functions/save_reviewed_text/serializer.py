from rest_framework import serializers

from storage_api.models.image_models import Image, ImgCrop


class Serializer(serializers.Serializer):
    usernameImgCrop = serializers.PrimaryKeyRelatedField(queryset=ImgCrop.objects.all())
    hashtagImgCrop = serializers.PrimaryKeyRelatedField(queryset=ImgCrop.objects.all())
    usernameReviewedText = serializers.CharField()
    hashtagReviewedText = serializers.CharField()


