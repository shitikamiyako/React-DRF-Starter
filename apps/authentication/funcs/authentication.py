import os
import environ
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import authentication
from rest_framework import exceptions

from .excepts.firebase_auth_exceptions import FirebaseError
from .excepts.firebase_auth_exceptions import InvalidAuthToken
from .excepts.firebase_auth_exceptions import NoAuthToken

env = environ.Env(DEBUG=(bool, False))
DEBUG = env('DEBUG')
User = get_user_model

# Django-environで管理するようにする
cred = credentials.Certificate({
    "type": "service_account",
    "project_id": env.get_value('FIREBASE_PROJECT_ID', str),
    "private_key_id": env.get_value('FIREBASE_PRIVATE_KEY_ID', str),
    "private_key": env.get_value('FIREBASE_PRIVATE_KEY', str).replace('\\n', '\n'),
    "client_email": env.get_value('FIREBASE_CLIENT_EMAIL', str),
    "client_id": env.get_value('FIREBASE_CLIENT_ID', int),
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": env.get_value('FIREBASE_CLIENT_CERT_URL', str)
})
# 上記の認証情報でfirebase初期化
default_app = firebase_admin.initialize_app(cred)

# DRFのBaseAuthenticationクラスを継承してfirebase用の認証クラスを作る
class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            raise NoAuthToken("No auth token provided")

        id_token = auth_header.split(" ").pop()
        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise InvalidAuthToken("Invalid auth token")

        if not id_token or not decoded_token:
            return None

        try:
            uid = decoded_token.get("uid")
        except Exception:
            raise FirebaseError()

        user, created = User.objects.get_or_create(username=uid,uid=uid)
        user.profile.last_activity = timezone.localtime()
