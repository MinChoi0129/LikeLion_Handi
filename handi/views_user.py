from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import *
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout


class Login(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        username = serializer.initial_data["username"]
        password = serializer.initial_data["password"]
        user = authenticate(request=request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse(
                {"pk": user.pk, "username": username, "name": user.name},
                status=status.HTTP_200_OK,
            )
        return Response({"login": "failed"}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response({"logout": "success"}, status=status.HTTP_200_OK)

    queryset = User.objects.all()
    serializer_class = UserSerializer


class Signup(ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                "username": serializer.data["username"],
                "name": serializer.data["name"],
                "phone_number": serializer.data["phone_number"],
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    queryset = User.objects.all()
    serializer_class = UserSerializer


class SignUpCheck(RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        username = request.data["username"]
        for user in User.objects.all():
            if user.username == username:
                return Response({"available": False}, status=status.HTTP_409_CONFLICT)
        return Response({"available": True}, status=status.HTTP_200_OK)


class UserInformation(RetrieveAPIView):
    def get(self, request):
        print(request)
        return Response(self.data, status=status.HTTP_200_OK)


# Get All Users
class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# READ User
class UserDetail(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    queryset = User.objects.all()
    serializer_class = UserSerializer


# UPDATE User
class UserUpdate(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# DELETE User
class UserDelete(DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"success": True}, status=status.HTTP_204_NO_CONTENT)

    queryset = User.objects.all()
    serializer_class = UserSerializer


# Get Rank of User
class UserRank(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        all_users = sorted(
            [(user.game_score, user.name) for user in User.objects.all()], reverse=True
        )
        me = request.user
        my_score, my_name = me.game_score, me.name

        my_rank = -1
        for i in range(len(all_users)):
            score, name = all_users[i]
            if score == my_score and name == my_name:
                my_rank = i + 1

        return JsonResponse(
            {
                "me": (my_name, my_score, my_rank),
                "top_5_users": all_users[:5],  # 상위 5등만
            },
            json_dumps_params={"ensure_ascii": False},
        )

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRankUpdate(UpdateAPIView):
    def patch(self, request, *args, **kwargs):
        me = request.user

        old_score = me.game_score
        request_score = int(request.data["score"])
        new_score = max(old_score, request_score)
        me.game_score = new_score
        me.save()

        status_code = None
        if new_score == old_score:
            status_code = status.HTTP_202_ACCEPTED
        else:
            status_code = status.HTTP_202_ACCEPTED

        return Response({"name": me.name, "game_score": new_score}, status=status_code)

    queryset = User.objects.all()
    serializer_class = UserSerializer
