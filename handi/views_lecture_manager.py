from rest_framework.generics import *
from .models import LectureManager
from .serializers import LectureManagerSerializer


# Create a LectureManager or Get All LectureManagers
class LectureManagerList(ListCreateAPIView):
    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# READ LectureManager
class LectureManagerDetail(RetrieveAPIView):
    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# UPDATE LectureManager
class LectureManagerUpdate(UpdateAPIView):
    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# DELETE LectureManager
class LectureManagerDelete(DestroyAPIView):
    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer
