from django.contrib import admin

from data_gatherer.admin_sites import global_admin_site
from storage_api.models.data_models import Hashtag, IGUser, UserHashtagUse
from storage_api.models.image_models import Image, ImgCrop
from storage_api.models.project_models import *
from functions_api.functions.upload_pictures.models import ImageFile


class ProjectEntityAdmin(admin.ModelAdmin):
    list_filter = ['project']
    list_display = ['__str__', 'project']


class IGUserAdmin(ProjectEntityAdmin):
    list_display = ProjectEntityAdmin.list_display + [
        'alias',
        'matrix_name',
    ]


class UserHashtagUseAdmin(ProjectEntityAdmin):
    list_display = ProjectEntityAdmin.list_display + [
        'hashtag',
        'igUser',
        'image'
    ]

    list_filter = ProjectEntityAdmin.list_filter + [
        'hashtag',
        'igUser',
        'image'
    ]


global_admin_site.register(Project, admin.ModelAdmin)
global_admin_site.register(Image, ProjectEntityAdmin)
global_admin_site.register(Hashtag, ProjectEntityAdmin)
global_admin_site.register(IGUser, IGUserAdmin)
global_admin_site.register(UserHashtagUse, UserHashtagUseAdmin)
global_admin_site.register(ProjectDefaultCrop, ProjectEntityAdmin)

