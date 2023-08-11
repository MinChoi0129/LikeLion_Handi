from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework import status
from .models import Lecture


class Quiz(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.get(id=kwargs["lecture_id"])
        quiz = []
        for mediaentry in list(lecture.media_entries.all())[:39]:
            quiz.append({"name": mediaentry.name, "video_url": mediaentry.video_url})
        return Response({"quiz": quiz}, status=status.HTTP_200_OK)
