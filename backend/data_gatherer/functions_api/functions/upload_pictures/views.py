import os

from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

from storage_api.models.project_models import Project
from .forms import ImagesForm
from storage_api.models.image_models import Image
from functions_api.functions.upload_pictures.logic import upload_files
from rest_framework.response import Response
from rest_framework import status

# TODO controllare che l'utente abbia fatto il login

# Create your views here.
def index(request):
    if request.user.is_authenticated is False:
        return Response(status=status.HTTP_403_FORBIDDEN)

    images = Image.objects.all()
    context = {'images': images}
    return render(request, "index.html", context)


def fileupload(request):
    if request.user.is_authenticated is False:
        return Response(status=status.HTTP_403_FORBIDDEN)

    form = ImagesForm(request.POST, request.FILES)
    if request.method == 'POST':
        files = request.FILES.getlist('files')
        project = Project.objects.get(pk=request.POST['project'])
        upload_files(files, project)
        return redirect(os.environ.get("REACT_URL", default="http://localhost:3000"))
    context = {'form': form}
    return render(request, "upload.html", context)
