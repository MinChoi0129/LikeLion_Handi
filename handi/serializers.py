from .models import User, Lecture, MediaEntry, LectureManager
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"


class MediaEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaEntry
        fields = "__all__"


class LectureManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureManager
        fields = "__all__"
