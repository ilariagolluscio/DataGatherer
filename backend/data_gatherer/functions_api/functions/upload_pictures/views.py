import os

from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

from storage_api.models.project_models import Project
from .forms import ImagesForm
from .models import ImageFile
from storage_api.models.image_models import Image
from functions_api.functions.upload_pictures.logic import upload_files


# Create your views here.
def index(request):
    images = ImageFile.objects.all()
    context = {'images': images}
    return render(request, "index.html", context)


def fileupload(request):
    form = ImagesForm(request.POST, request.FILES)
    if request.method == 'POST':
        files = request.FILES.getlist('files')
        project = Project.objects.get(pk=request.POST['project'])
        upload_files(files, project)
        return redirect(os.environ.get("REACT_URL", default="http://localhost:3000"))
    context = {'form': form}
    return render(request, "upload.html", context)
