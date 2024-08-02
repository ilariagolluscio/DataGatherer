import os

from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

from storage_api.models.project_models import Project
from .forms import ImagesForm
from .models import ImageFile
from storage_api.models.image_models import Image


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
        for file in files:
            entity:Image = Image.objects.filter(project=project).order_by('userId').last()
            value = 1
            if entity is not None:
                value = entity.userId +1
            image = Image(
                userId=value,
                project=project
            )
            image.save()
            image_ins = ImageFile(file=file, referencesImage=image)
            image_ins.save()
        return redirect(os.environ.get("REACT_URL", default="http://localhost:3000"))
    context = {'form': form}
    return render(request, "upload.html", context)
