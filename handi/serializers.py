from .models import User, Lecture, MediaEntry, LectureManager, QuizResult
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "name",
            "nickname",
            "game_score",
            "email_address",
            "email",
            "profile_img",
        )

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


class QuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = "__all__"
