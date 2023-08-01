from django.shortcuts import render
from rest_framework.generics import *
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

# Create your views here.


# CREATE User
class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# READ User(s)


class UserDetail(RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

# UPDATE User


class UserUpdate(UpdateAPIView):
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.name = request.data["name"]
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    queryset = User.objects.all()
    serializer_class = UserSerializer

# DELETE User


class UserDelete(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
