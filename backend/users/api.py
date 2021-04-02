# 3rd party packages
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import permissions

from knox.models import AuthToken

# Serializers
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Models
from django.contrib.auth.models import User

# Class will process the post request to /api/auth/register
# Check whether the username is available and creates a user if it is
# Provides a authentication token on creation of user
class RegisterAPI(generics.GenericAPIView):
    # Get request not defined
    # Will produce a Method Not Allowed response on getting a GET request

    # Initialize the serializer class
    serializer_class = RegisterSerializer

    # Register the user and return a auth token as response
    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        print(serializer)
        # Produce an exception if the serializer is not valid
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Class will process the post request to /api/auth/login
# Check whether the username/password supplied is correct and logs in a user if it is
# Provides a authentication token on login of user
class LoginAPI(generics.GenericAPIView):
    # Get request not defined
    # Will produce a Method Not Allowed response on getting a GET request

    # Initialize the serializer class
    serializer_class = LoginSerializer

    # Login the user and return a auth token as response
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # Produce an exception if the serializer is not valid
        # Serializer won't be valid on a wrong username/password
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Class will process the post request to /api/auth/user
# Returns the user that is logged in
# Only works if a user is already logged in
class UserAPI(generics.RetrieveAPIView):
    # Only allow authenticated users to access this class
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # Initialize the serializer class
    serializer_class = UserSerializer

    # Return the user object
    def get_object(self):
        return self.request.user
