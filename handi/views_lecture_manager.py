from django.shortcuts import render
from rest_framework.generics import *
from .models import LectureManager
from .serializers import LectureManagerSerializer

# Create your views here.


class LectureManagerList(ListCreateAPIView):
    queryset = LectureManager.objects.all()
    serializer_class = LectureManagerSerializer


# READ LectureManager(s)
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
