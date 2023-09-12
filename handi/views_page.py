from django.shortcuts import render
from .models import User
from django.shortcuts import get_object_or_404
from django.conf import settings

SERVER_ADDRESS = settings.SERVER_ADDRESS


def main(request):
    if request.user.is_authenticated:
        if not request.user.name:
            user = request.user
            user.name = request.user.username
            user.save()
        if not request.user.nickname:
            user = request.user
            user.nickname = request.user.username
            user.save()
    return render(request, "index.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def contact(request):
    return render(request, "contact.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def login(request):
    return render(request, "login.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def signup(request):
    return render(request, "signup.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def translate(request):
    return render(request, "translation.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def lecture(request):
    return render(request, "studyHome.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def inLecture(request, lecture_id):
    return render(
        request,
        "lectureCategory.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def studyWord(request, lecture_id):
    return render(
        request,
        "studyWord.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def studySentence(request, lecture_id):
    return render(
        request,
        "studySituation.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def quizSign(request, lecture_id):
    return render(
        request,
        "TestSign.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def quizWord(request, lecture_id):
    return render(
        request,
        "TestWord.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def quizSentence(request, lecture_id):
    return render(
        request,
        "TestSituation.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def wordResult(request, lecture_id):
    return render(
        request,
        "WordResult.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


def sentenceResult(request, lecture_id):
    return render(
        request,
        "SituationResult.html",
        {"lecture_id": lecture_id, "SERVER_ADDRESS": SERVER_ADDRESS},
    )


# 추후 메인 게임 페이지로 변경
def game(request):
    return render(request, "gameInformation.html", {"SERVER_ADDRESS": SERVER_ADDRESS})


def inGame(request):
    user = get_object_or_404(User, pk=request.user.id)
    return render(
        request, "game.html", {"user": user, "SERVER_ADDRESS": SERVER_ADDRESS}
    )


def myPage(request):
    user = request.user
    return render(
        request, "mypage.html", {"user": user, "SERVER_ADDRESS": SERVER_ADDRESS}
    )


def rankingPage(request):
    return render(request, "ranking.html")
