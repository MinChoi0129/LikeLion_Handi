from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import *
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout

class Login(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        username = serializer.initial_data['username']
        password = serializer.initial_data['password']
        print(username)
        print(password)
        user = authenticate(request=request, username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return Response(serializer.initial_data, status=status.HTTP_200_OK)
        else:
            return Response({"message" : "실패."}, status=status.HTTP_400_BAD_REQUEST)
        
    
class Logout(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response({"logout" : "성공."}, status=status.HTTP_200_OK)

    queryset = User.objects.all()
    serializer_class = UserSerializer

class Signup(ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    queryset = User.objects.all()
    serializer_class = UserSerializer


# CREATE a User or Get All Users
class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# READ User
class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# UPDATE User
class UserUpdate(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# DELETE User
class UserDelete(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRank(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        all_users = sorted([(user.game_score, user.name)
                            for user in User.objects.all()], reverse=True)
        me = User.objects.get(id=kwargs['pk'])
        my_score, my_name = me.game_score, me.name

        my_rank = -1
        for i in range(len(all_users)):
            score, name = all_users[i]
            if score == my_score and name == my_name:
                my_rank = i+1

        return JsonResponse({
            "me": (my_name, my_score, my_rank),
            "top_5_users": all_users[:5]  # 상위 5등만
        }, json_dumps_params={'ensure_ascii': False})

    queryset = User.objects.all()
    serializer_class = UserSerializer
