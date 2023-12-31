from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework import status
from .models import LectureManager
from .serializers import LectureManagerSerializer
from datetime import datetime


# Create a LectureManager or Get All LectureManagers
class LectureManagerList(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        lectureManager = LectureManager.objects.filter(user=request.user.id).order_by(
            "-time"
        )
        form = []

        for lectureManager_i in lectureManager:
            if not lectureManager_i.percentage == 100:
                form.append(
                    {
                        "id": lectureManager_i.id,
                        "percentage": lectureManager_i.percentage,
                        "time": lectureManager_i.time,
                        "user": lectureManager_i.user.id,
                        "lecture": lectureManager_i.lecture.id,
                    }
                )
        return Response(form, content_type="charset=utf-8", status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = LectureManagerSerializer(
            data={
                "user": request.user.id,
                "lecture": request.data["lecture"],
                "percent": request.data["percentage"],
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


class LectureManagerListDone(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        lectureManager = LectureManager.objects.filter(user=request.user.id).order_by(
            "-time"
        )
        form = []

        for lectureManager_i in lectureManager:
            if lectureManager_i.percentage == 100:
                form.append(
                    {
                        "id": lectureManager_i.id,
                        "percentage": lectureManager_i.percentage,
                        "time": lectureManager_i.time,
                        "user": lectureManager_i.user.id,
                        "lecture": lectureManager_i.lecture.id,
                    }
                )
        return Response(form, content_type="charset=utf-8", status=status.HTTP_200_OK)


# READ LectureManager
class LectureManagerDetail(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lectureManager = LectureManager.objects.filter(
            user=request.user.id, lecture=kwargs["lecture_id"]
        )
        serializer = LectureManagerSerializer(lectureManager, many=True)
        return Response(serializer.data)

    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# UPDATE LectureManager
class LectureManagerUpdate(UpdateAPIView):
    def patch(self, request, *args, **kwargs):
        try:
            lecture_manager = LectureManager.objects.get(
                user=request.user, lecture=kwargs["lecture_id"]
            )
            if lecture_manager.percentage < float(request.data["percentage"]):
                lecture_manager.percentage = float(request.data["percentage"])

            lecture_manager.time = datetime.now()

            lecture_manager.save()
            return Response({"success": True}, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)

    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer
