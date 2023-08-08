from .models import User, Lecture, MediaEntry, LectureManager
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data["password"])
        user.is_active = True
        user.save()
        return user


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"


class MediaEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaEntry
        fields = "__all__"

    def create(self, validated_data):
        mediaentry = super(MediaEntrySerializer, self).create(validated_data)
        mediaentry.save()
        return mediaentry


class LectureManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureManager
        fields = "__all__"
