from rest_framework import status
from rest_framework.exceptions import APIExeptions

class NoAuthToken(APIExeptions):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "No authentications token provided"
    default_code = "no_auth_token"

class InvalidAuthToken(APIExeptions):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Invalid authentication token provided"
    default_code = "invalid_token"

class FirebaseError(APIExeptions):
    staus_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "The user provided with the auth token is not valid Firebase user, it has no Firebase UID"
    default_code = "no_firebase_uid"
