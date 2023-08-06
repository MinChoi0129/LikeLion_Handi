from django.db import models
from django.contrib.auth.models import AbstractUser
import os


def renameImagePath(instance, filename):
    upload_to = "profiles"
    ext = filename.split(".")[-1]
    filename = "{}.{}".format(instance.username, ext)
    return os.path.join(upload_to, filename)


class User(AbstractUser):
    name = models.CharField(max_length=10)
    game_score = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=15)
    profile_img = models.ImageField(upload_to=renameImagePath, blank=True, null=True)


class MediaEntry(models.Model):
    name = models.CharField(max_length=30)
    video_url = models.CharField(max_length=30)
    image_url = models.CharField(max_length=30)
    data = models.JSONField(default=dict, blank=True)


class Lecture(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    main_category = models.CharField(max_length=15)
    sub_category = models.CharField(max_length=15)
    theme_category = models.CharField(max_length=15, blank=True, null=True)
    level = models.IntegerField()
    length = models.IntegerField()
    media_entry = models.ManyToManyField(MediaEntry)
    lecture_img = models.ImageField(upload_to="lectures/", blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class LectureManager(models.Model):
    user = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE)
    lecture = models.ForeignKey(
        Lecture, related_name="lecture", on_delete=models.CASCADE
    )
    percentage = models.FloatField(default=0)
    time = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.user
