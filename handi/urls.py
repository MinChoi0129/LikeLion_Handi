from django.urls import path
from .views_translate import Translator
from .views_lecture import *
from .views_lecture_manager import *
from .views_user import *
from .views_mediaentry import *
from .views_game import *
from .views_quiz import *

urlpatterns = [
    path("api/translate/", Translator.as_view()),
    path("api/login/", Login.as_view()),
    path("api/logout/", Logout.as_view()),
    path("api/signup/", Signup.as_view()),
    path("api/users/", UserList.as_view()),
    path("api/user/", UserDetail.as_view()),
    path("api/user/userinfo/", UserInformation.as_view()),
    # path("api/user/update/<pk>/", UserUpdate.as_view()),
    # path("api/user/delete/<pk>/", UserDelete.as_view()),
    path("api/users/rank/", UserRank.as_view()),
    path("api/users/rank/update/", UserRankUpdate.as_view()),
    path("api/lectures/", LectureList.as_view()),
    path("api/lecture/<pk>/", LectureDetail.as_view()),
    path("api/lecturemanagers/", LectureManagerList.as_view()),
    path("api/lecturemanager/<lecture_id>/", LectureManagerDetail.as_view()),
    path("api/lecturemanager/update/<lecture_id>/", LectureManagerUpdate.as_view()),
    path("api/mediaentries/", MediaEntryList.as_view()),
    path("api/mediaentry/<pk>/", MediaEntryDetail.as_view()),
    path("api/game/", Game.as_view()),
    path("api/quiz/<lecture_id>/", Quiz.as_view()),
    path("api/quiz/result/<lecture_id>/", QuizResults.as_view()),
    path("api/quiz/result/delete/<lecture_id>/", QuizResultDelete.as_view()),
    path("api/signup/checkid/", SignUpCheck.as_view()),
]