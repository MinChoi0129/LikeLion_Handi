from django.shortcuts import render


def main(request):
    return render(request, "index.html")


def login(request):
    return render(request, "index2.html")


def signup(request):
    return render(request, "index3.html")
