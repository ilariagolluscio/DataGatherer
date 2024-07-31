from django import forms

from storage_api.models.project_models import Project
from .models import ImageFile


class ImagesForm(forms.Form):

    files = forms.FileField(widget=forms.TextInput(attrs={
        "name": "images",
        "type": "File",
        "class": "form-control",
        "multiple": "True",
    }), label="")

    project = forms.ModelChoiceField(
        Project.objects.all()
    )
