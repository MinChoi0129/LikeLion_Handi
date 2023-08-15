from rest_framework.generics import *
from rest_framework.response import Response
from .models import Lecture
from .serializers import LectureSerializer


# Create a Lecuture or Get All Lectures
class LectureList(ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.all()
        serializer = LectureSerializer(lecture, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        lecture = Lecture.objects.filter(name__contains = request.data['name'])
        serializer = LectureSerializer(lecture, many=True)
        return Response(serializer.data)
    
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


# READ Lecture
class LectureDetail(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        lecture = Lecture.objects.get(id=kwargs["pk"])
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)
    
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
