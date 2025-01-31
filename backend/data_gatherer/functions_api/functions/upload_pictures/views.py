import os
import sys

from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer

from storage_api.models.project_models import Project
from .forms import ImagesForm
from storage_api.models.image_models import Image
from functions_api.functions.upload_pictures.logic import upload_files
from rest_framework.response import Response
from rest_framework import status

# TODO controllare che l'utente abbia fatto il login

# Create your views here.
def index(request):
    images = Image.objects.all()
    context = {'images': images}
    return render(request, "index.html", context)


@csrf_exempt
def fileupload(request):
    print(request.POST)
    form = ImagesForm(request.POST, request.FILES)
    if request.method == 'POST':
        user = request.user
        if user is None:
            response = Response(
                status=status.HTTP_403_FORBIDDEN,
                data="user is needed"
            )
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            response.render()
        files = request.FILES.getlist('files')
        if files is []:
            files = request.POST['files']
        project = Project.objects.get(pk=request.POST['project'])
        print(files)
        upload_files(files, project, user)
        response = Response(
            status=status.HTTP_200_OK,
            data="files have been uploaded"
        )
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = "application/json"
        response.renderer_context = {}
        response.render()
    context = {'form': form}
    return render(request, "upload.html", context)
