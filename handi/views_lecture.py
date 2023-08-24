from rest_framework.generics import *
from rest_framework.response import Response
from .models import Lecture, LectureManager
from .serializers import LectureSerializer
from rest_framework.response import Response
from rest_framework import status


# Create a Lecuture or Get All Lectures
class LectureList(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.all()
        form = []

        for lecture_i in lecture:
            lecture_manager = LectureManager.objects.filter(
                user=request.user.id, lecture=lecture_i.id
            ).first()

            if not lecture_manager:
                percentage = 0

            else:
                percentage = lecture_manager.percentage

            form.append(
                {
                    "id": lecture_i.id,
                    "name": lecture_i.name,
                    "main_category": lecture_i.main_category,
                    "sub_category": lecture_i.sub_category,
                    "theme_category": lecture_i.theme_category,
                    "level": lecture_i.level,
                    "length": lecture_i.length,
                    "lecture_img": lecture_i.lecture_img.url,
                    "percentage": percentage,
                }
            )
        return Response(form, content_type="charset=utf-8", status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        lecture = Lecture.objects.filter(name__contains=request.data["name"])
        serializer = LectureSerializer(lecture, many=True)
        return Response(serializer.data)

    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# READ Lecture
class LectureDetail(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.get(id=kwargs["pk"])
        lecture_manager = LectureManager.objects.filter(
            user=request.user, lecture=kwargs["pk"]
        ).first()
        if not lecture_manager:
            percentage = 0
        else:
            percentage = lecture_manager.percentage

        form = {
            "id": lecture.id,
            "name": lecture.name,
            "main_category": lecture.main_category,
            "sub_category": lecture.sub_category,
            "theme_category": lecture.theme_category,
            "level": lecture.level,
            "length": lecture.length,
            "lecture_img": lecture.lecture_img.url,
            "description": lecture.description,
            "percentage": percentage,
            "media_entries": [],
        }

        for media_entry in lecture.media_entries.all():
            form["media_entries"].append(
                {
                    "name": media_entry.name,
                    "entry_type": media_entry.entry_type,
                    "video_url": media_entry.video_url,
                    "image_url": media_entry.image_url,
                    "data": media_entry.data,
                }
            )
        return Response(form, content_type="charset=utf-8", status=status.HTTP_200_OK)

    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
