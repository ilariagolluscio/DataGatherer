from rest_framework import serializers
from storage_api.models.data_models import *


class ImgDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgData
        fields = '__all__'


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = '__all__'


class IGUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = IGUser
        fields = '__all__'


class UserHashtagUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHashtagUse
        fields = '__all__'


