from django.contrib import admin

from storage_api.models.data_models import ImgData, Hashtag, IGUser, UserHashtagUse
from storage_api.models.image_models import Image, ImgCrop
from storage_api.models.project_models import Project
from functions_api.functions.upload_pictures.models import ImageFile

admin.site.register(Project, admin.ModelAdmin)
admin.site.register(Image, admin.ModelAdmin)
admin.site.register(ImgData, admin.ModelAdmin)
admin.site.register(Hashtag, admin.ModelAdmin)
admin.site.register(ImgCrop, admin.ModelAdmin)
admin.site.register(ImageFile, admin.ModelAdmin)
admin.site.register(IGUser, admin.ModelAdmin)
admin.site.register(UserHashtagUse, admin.ModelAdmin)

