from typing import Union

from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from functions_api.functions.extend_network_from_image.logic import extend_network_from_image
from functions_api.functions.use_default_crop.logic import apply_default_crop_to_target_image
from functions_api.functions.extend_network_from_image.serializer import Serializer
from storage_api.models.image_models import ImgCrop, Image
from storage_api.serializers.image_serializers import ImgCropSerializer
from rest_framework import generics


class ExtendNetworkFromImageView(generics.CreateAPIView):
    queryset = []
    serializer_class = Serializer

    def create(self, request, *args, **kwargs):
        ser = Serializer(data=request.data)
        print(request.data)
        ser.is_valid(raise_exception=True)
        target_image:Image = ser.validated_data['targetImage']

        try:
            username_crop = ImgCrop.objects.get(
                fieldName='Username',
                image=target_image,
            )
        except ObjectDoesNotExist or MultipleObjectsReturned:
            return Response("Non esiste alcun dato Username nel sistema!", HTTP_404_NOT_FOUND)
        except MultipleObjectsReturned:
            return Response("Esiste più di un dato Username nel sistema!", HTTP_404_NOT_FOUND)

        try:
            hashtags_crop = ImgCrop.objects.get(
                fieldName='Hashtags',
                image=target_image,
            )
        except ObjectDoesNotExist :
            return Response("Non esiste alcun dato Hashtags nel sistema!", HTTP_404_NOT_FOUND)
        except MultipleObjectsReturned:
            return Response("Esiste più di un dato Hashtags nel sistema!", HTTP_404_NOT_FOUND)

        extend_network_from_image(
            username_crop.reviewedText,
            hashtags_crop.reviewedText,
            target_image.project,
            target_image
        )

        return Response("{}", HTTP_200_OK)
