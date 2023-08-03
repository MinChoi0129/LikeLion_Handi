from django.contrib import admin

# Register your models here.

from .models import User, Lecture, MediaEntry, LectureManager

class LectureManagerAdmin(admin.ModelAdmin):
    readonly_fields = ('time',)

admin.site.register(User)
admin.site.register(Lecture)
admin.site.register(LectureManager,LectureManagerAdmin)
admin.site.register(MediaEntry)
