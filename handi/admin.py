from django.contrib import admin

# Register your models here.

from .models import User, Lecture, MediaEntry, LectureManager


admin.site.register(User)
admin.site.register(Lecture)
admin.site.register(LectureManager)
admin.site.register(MediaEntry)
