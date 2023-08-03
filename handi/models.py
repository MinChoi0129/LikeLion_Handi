from django.db import models
from django.contrib.auth.models import AbstractUser
import os


# 함수 정의
def renameImagePath(instance, filename):
    upload_to = 'profiles'
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(instance.pk, ext)
    return os.path.join(upload_to, filename)


class User(AbstractUser):
    # id = models.CharField(max_length=50, primary_key=True)
    # pw = models.CharField(max_length=250)
    name = models.CharField(max_length=10)
    game_score = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=15)
    profile_img = models.ImageField(
        upload_to=renameImagePath, blank=True, null=True)


class MediaEntry(models.Model):
    media_entry = models.JSONField()
    # {
    #     "metadata": {
    #         "video_name": "asdasd.mp4",
    #         "duration": 4.123,
    #     },
    #     "data": [
    #         {
    #             "start":
    #             "end":
    #             "attributes": [
    #                 {"name": "여기"}
    #             ]
    #         }
    #     ]
    # }


class Lecture(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    main_category = models.CharField(max_length=15)
    sub_category = models.CharField(max_length=15)
    theme_category = models.CharField(max_length=15, blank=True, null=True)
    level = models.IntegerField()
    length = models.IntegerField()
    media_entry = models.ManyToManyField(MediaEntry)
    lecture_img = models.ImageField(
        upload_to="lecture/", blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class LectureManager(models.Model):
    user = models.ForeignKey(User, related_name="user",
                             on_delete=models.CASCADE)
    lecture = models.ForeignKey(
        Lecture, related_name="lecture", on_delete=models.CASCADE)
    percentage = models.FloatField(default=0)
    time = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.user