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
        lecture = Lecture.objects.filter(
            main_category__contains=request.data["main_category"]
        )
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

    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


class LectureSearch(ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        if "main_category" in request.data and request.data["main_category"] == "카테고리":
            lecture = Lecture.objects.filter(
                name__contains=request.data["name"],
            )
        else:
            lecture = Lecture.objects.filter(
                name__contains=request.data["name"],
                main_category=request.data["main_category"],
            )
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

    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


class LecturePopular(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.all()

        lecture_dict = {}
        for i in range(1, len(lecture)):
            lecture_dict[i] = 0

        lectureManager = LectureManager.objects.all()
        for lecture_i in lectureManager.all():
            lecture_dict[lecture_i.lecture.pk] += 1

        lecture_count = sorted(
            lecture_dict, key=lambda x: lecture_dict[x], reverse=True
        )

        form = []

        for i in range(5):
            lecture = Lecture.objects.get(pk=lecture_count[i])
            lecture_manager = LectureManager.objects.filter(
                user=request.user.id, lecture=lecture_count[i]
            ).first()

            if not lecture_manager:
                percentage = 0

            else:
                percentage = lecture_manager.percentage

            form.append(
                {
                    "id": lecture.id,
                    "name": lecture.name,
                    "main_category": lecture.main_category,
                    "sub_category": lecture.sub_category,
                    "theme_category": lecture.theme_category,
                    "level": lecture.level,
                    "length": lecture.length,
                    "lecture_img": lecture.lecture_img.url,
                    "percentage": percentage,
                }
            )

        return Response(form, content_type="charset=utf-8", status=status.HTTP_200_OK)

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
