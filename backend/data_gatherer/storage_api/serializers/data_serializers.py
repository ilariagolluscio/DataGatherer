from rest_framework import serializers
from storage_api.models.data_models import *


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = '__all__'
        read_only_fields = ['author']


class IGUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = IGUser
        fields = '__all__'
        read_only_fields = ['author']


class UserHashtagUseSerializer(serializers.ModelSerializer):
    igUser = IGUserSerializer()
    hashtag = HashtagSerializer()

    class Meta:
        model = UserHashtagUse
        fields = '__all__'
        read_only_fields = ['author']


