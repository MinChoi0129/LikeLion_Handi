from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=10)
    game_score = models.IntegerField(default=0, blank=True, null=True)
    email_address = models.CharField(max_length=50, blank=True, null=True)
    nickname = models.CharField(max_length=50, blank=True, null=True)
    profile_img = models.ImageField(upload_to="profiles/", blank=True, null=True)


class MediaEntry(models.Model):
    name = models.CharField(max_length=30)
    entry_type = models.CharField(max_length=10, blank=True, null=True)
    video_url = models.CharField(max_length=100)
    image_url = models.CharField(max_length=100)
    data = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.name


class Lecture(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    main_category = models.CharField(max_length=15)
    sub_category = models.CharField(max_length=15)
    theme_category = models.CharField(max_length=15, blank=True, null=True)
    level = models.IntegerField()
    length = models.IntegerField()
    media_entries = models.ManyToManyField(MediaEntry)
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


class QuizResult(models.Model):
    user = models.ForeignKey(User, related_name="quiz_user", on_delete=models.CASCADE)
    lecture = models.ForeignKey(
        Lecture, related_name="quiz_lecture", on_delete=models.CASCADE
    )
    RightPer = models.FloatField(default=0)
    wrong_choices = models.TextField()
