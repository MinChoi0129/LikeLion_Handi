from rest_framework.generics import *
from .models import Lecture
from .serializers import LectureSerializer


# Create a Lecuture or Get All Lectures
class LectureList(ListCreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# READ Lecture
class LectureDetail(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.get(id=kwargs["pk"])
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
            "media_entries": [],
        }

        for media_entry in lecture.media_entries.all():
            form["media_entries"].append(
                {
                    "name": media_entry.name,
                    "video_url": media_entry.video_url,
                    "image_url": media_entry.image_url,
                    "data": media_entry.data,
                }
            )

        return Response(form, status.HTTP_200_OK)

    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
