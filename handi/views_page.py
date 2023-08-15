from django.shortcuts import render

def main(request):
    if request.user.is_authenticated:
        if not request.user.name:
            users = request.user
            users.name = request.user.username
            users.save()
        return render(request, "index.html")
    return render(request, "index.html")

def login(request):
    return render(request, "login.html")

def signup(request):
    return render(request, "signup.html")


def translate(request):
    return render(request, "translation.html")

def study(request):
    return render(request, "studyHome.html")

def situation(request):
    return render(request, "TestSign.html")

# 추후 메인 게임 페이지로 변경
def game(request):
    return render(request, "game.html")
    
