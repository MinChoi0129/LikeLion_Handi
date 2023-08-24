from pathlib import Path
import os, json, requests

BASE_DIR = Path(__file__).resolve().parent.parent


def get_secret():
    try:
        secret_file = os.path.join(BASE_DIR, "config", "secrets.json")
        with open(secret_file) as f:
            secrets = json.loads(f.read())

        return secrets["SECRET_KEY"]

    except KeyError:
        error_msg = "Set the environment variable"
        raise ImportError(error_msg)


# SERVER_ADDRESS = requests.get("http://ip.jsontest.com").json()["ip"]
# SERVER_ADDRESS = "뭐라캐쌌노.메인.한국"
SERVER_ADDRESS = "localhost"

server_settings_js = os.path.join(BASE_DIR, "static", "js", "SERVER_SETTINGS.js")

with open(server_settings_js, mode="w", encoding="utf-8") as h:
    new_line = "var SERVER_ADDRESS = " + '"http://' + SERVER_ADDRESS + '"'
    h.write(new_line)


SECRET_KEY = get_secret()
ALLOWED_HOSTS = ["*"]


DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True
SECURE_CROSS_ORIGIN_OPENER_POLICY = None
SOCIALACCOUNT_LOGIN_ON_GET = True
ACCOUNT_LOGOUT_ON_GET = True


LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Seoul"
USE_I18N = True
USE_TZ = True


LOGIN_REDIRECT_URL = "/"
ACCOUNT_LOGOUT_REDIRECT_URL = "/"


STATIC_URL = "/static/"
MEDIA_URL = "/media/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")


AUTH_USER_MODEL = "handi.User"
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


SITE_ID = 1


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.sites",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "handi",
    "corsheaders",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.naver",
    "allauth.socialaccount.providers.kakao",
]


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)


SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {"access_type": "online"},
    }
}
