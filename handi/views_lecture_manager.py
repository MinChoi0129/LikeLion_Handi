from rest_framework.generics import *
from rest_framework.response import Response
from .models import LectureManager
from .serializers import LectureManagerSerializer


# Create a LectureManager or Get All LectureManagers
class LectureManagerList(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        lectureManager = LectureManager.objects.filter(user=request.data["user"]).order_by(
            "-time"
        )
        serializer = LectureManagerSerializer(lectureManager, many=True)
        return Response(serializer.data)

    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# READ LectureManager
class LectureManagerDetail(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lectureManager = LectureManager.objects.filter(user=request.data["user"], lecture=request.data["lecture"])
        serializer = LectureManagerSerializer(lectureManager, many=True)
        return Response(serializer.data)

    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# UPDATE LectureManager
class LectureManagerUpdate(UpdateAPIView):
    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer
