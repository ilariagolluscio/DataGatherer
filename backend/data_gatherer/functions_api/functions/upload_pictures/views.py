from django.shortcuts import render, redirect
from .forms import ImagesForm
from .models import ImageFile


# Create your views here.
def index(request):
    images = ImageFile.objects.all()
    context = {'images': images}
    return render(request, "index.html", context)


def fileupload(request):
    form = ImagesForm(request.POST, request.FILES)
    if request.method == 'POST':
        images = request.FILES.getlist('files')
        for file in images:
            image_ins = ImageFile(file=file)
            image_ins.save()
        return redirect('index')
    context = {'form': form}
    return render(request, "upload.html", context)
