from django.contrib import admin

from storage_api.models.data_models import IgData, Hashtag
from storage_api.models.image_models import Image, ImgCrop
from storage_api.models.project_models import Project

admin.site.register(Project, admin.ModelAdmin)
admin.site.register(Image, admin.ModelAdmin)
admin.site.register(IgData, admin.ModelAdmin)
admin.site.register(Hashtag, admin.ModelAdmin)
admin.site.register(ImgCrop, admin.ModelAdmin)
