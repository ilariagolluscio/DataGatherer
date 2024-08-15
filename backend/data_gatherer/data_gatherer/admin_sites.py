from django.contrib import admin


class CustomAdminSite(admin.AdminSite):
    site_header = "Data Gatherer Entity Manager"
    site_title = "Data Gatherer Entity Manager"


global_admin_site = CustomAdminSite(name='global_admin')
