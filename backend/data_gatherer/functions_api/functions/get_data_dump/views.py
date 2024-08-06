import io

from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.decorators import api_view

from functions_api.functions.create_matrix.logic import create_matrix
from functions_api.functions.save_reviewed_text.logic import save_reviewed_text
from functions_api.functions.use_default_crop.logic import apply_default_crop_to_target_image
from functions_api.functions.create_matrix.serializer import Serializer
from storage_api.models.image_models import ImgCrop, Image
from storage_api.models.project_models import Project
from storage_api.serializers.image_serializers import ImgCropSerializer
from rest_framework import generics
from django.http import HttpResponse
from django.core.management import call_command


class GetDataDumpApiView(generics.ListAPIView):

    def list(self, request, *args, **kwargs):
        with io.StringIO() as out:
            call_command('dumpdata', stdout=out)
            dump = out.getvalue()

        response = HttpResponse(content_type='text/json', content=dump)
        response['Content-Disposition'] = 'attachment; filename=dump.json'

        return response
