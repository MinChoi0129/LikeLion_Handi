"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from handi import views_page
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views_page.main, name="main"),
    path("test/", views_page.test, name="test"),
    path("login/", views_page.login, name="login"),
    path("signup/", views_page.signup, name="signup"),
    path("translate/", views_page.translate, name="translate"),
    path("lecture/", views_page.lecture, name="lecture"),
    path("lecture/<int:lecture_id>/", views_page.inLecture, name="inLecture"),
    path(
        "lecture/<int:lecture_id>/study/word/", views_page.studyWord, name="studyWord"
    ),
    path(
        "lecture/<int:lecture_id>/study/sentence/",
        views_page.studySentence,
        name="studySentence",
    ),
    path("lecture/<int:lecture_id>/quiz/word/", views_page.quizWord, name="quizWord"),
    path(
        "lecture/<int:lecture_id>/quiz/sentence/",
        views_page.quizSentence,
        name="quizSentence",
    ),
    path(
        "lecture/<int:lecture_id>/result/word/",
        views_page.wordResult,
        name="wordResult",
    ),
    path(
        "lecture/<int:lecture_id>/result/sentence/",
        views_page.sentenceResult,
        name="sentenceResult",
    ),
    path("game/", views_page.game, name="game"),
    path("game/start/", views_page.inGame, name="inGame"),
    path("admin/", admin.site.urls),
    path("", include("handi.urls")),
    path("accounts/", include("allauth.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
