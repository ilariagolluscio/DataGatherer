from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.decorators import api_view

from functions_api.functions.use_default_crop.logic import apply_default_crop_to_target_image
from functions_api.functions.use_default_crop.serializer import Serializer
from storage_api.models.image_models import ImgCrop, Image
from storage_api.serializers.image_serializers import ImgCropSerializer
from rest_framework import generics


class UseDefaultCropView(generics.CreateAPIView):
    queryset = []
    serializer_class = Serializer

    def create(self, request, *args, **kwargs):
        ser = Serializer(data=request.data)
        print(request.data)
        ser.is_valid(raise_exception=True)
        fieldName = ser.validated_data['fieldName']
        targetImage = ser.validated_data['targetImage']

        queryset = ImgCrop.objects.filter(isDefault=True, fieldName=fieldName)

        if queryset.count() == 0:
            return Response('Non ci sono ritagli di default per il campo \'%s\'' % fieldName,
                            HTTP_404_NOT_FOUND)

        new_cut = apply_default_crop_to_target_image(targetImage, queryset.last())

        return Response(ImgCropSerializer(instance=new_cut).data, HTTP_200_OK)