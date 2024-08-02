from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.decorators import api_view

from functions_api.functions.save_reviewed_text.logic import save_reviewed_text
from functions_api.functions.use_default_crop.logic import apply_default_crop_to_target_image
from functions_api.functions.save_reviewed_text.serializer import Serializer
from storage_api.models.image_models import ImgCrop, Image
from storage_api.serializers.image_serializers import ImgCropSerializer
from rest_framework import generics


class SaveReviewedTextView(generics.CreateAPIView):
    queryset = []
    serializer_class = Serializer

    def create(self, request, *args, **kwargs):
        ser = Serializer(data=request.data)
        ser.is_valid(raise_exception=True)

        usernameImgCrop = ser.validated_data['usernameImgCrop']
        hashtagImgCrop = ser.validated_data['hashtagImgCrop']
        usernameReviewedText = ser.validated_data['usernameReviewedText']
        hashtagReviewedText = ser.validated_data['hashtagReviewedText']

        save_reviewed_text(
            usernameImgCrop,
            hashtagImgCrop,
            usernameReviewedText,
            hashtagReviewedText
        )

        queryset = [usernameImgCrop, hashtagImgCrop]

        return Response(ImgCropSerializer(queryset, many=True).data, HTTP_200_OK)
