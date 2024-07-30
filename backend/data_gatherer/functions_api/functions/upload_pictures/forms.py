from django import forms
from .models import ImageFile


class ImagesForm(forms.ModelForm):

    files = forms.FileField(widget=forms.TextInput(attrs={
        "name": "images",
        "type": "File",
        "class": "form-control",
        "multiple": "True",
    }), label="")

    class Meta:
        model = ImageFile
        fields = ['files']
