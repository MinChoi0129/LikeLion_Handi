from django.urls import path
from .views_translate import Translator
from .views_lecture import *
from .views_lecture_manager import *
from .views_user import *
from .views_mediaentry import *
from .import views_lecture_manager

urlpatterns = [
    path("api/translate/", Translator.as_view()),

    path("api/users/", UserList.as_view()),
    path("api/user/<pk>/", UserDetail.as_view()),
    path("api/user/update/<pk>/", UserUpdate.as_view()),
    path("api/user/delete/<pk>/", UserDelete.as_view()),
    path("api/users/rank/<pk>/", UserRank.as_view()),

    path("api/lectures/", LectureList.as_view()),
    path("api/lecture/<pk>/", LectureDetail.as_view()),

    # path("api/", MediaEntryList.as_view()),
    # path("api/", MediaEntryDetail.as_view()),
    # path("api/",  MediaEntryUpdate.as_view()),
    # path("api/", MediaEntryDelete.as_view()),

    path("api/lecturemanager/<user_id>/", LectureManagerList.as_view()),
    path("api/lecturemanager/<user_id>/<lecture_id>/", LectureManagerDetail.as_view()),
    path("api/lecturemanager-update/<pk>/", LectureManagerUpdate.as_view()),
]
