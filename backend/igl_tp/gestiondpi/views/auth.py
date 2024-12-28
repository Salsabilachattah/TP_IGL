from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import Group
from rest_framework import status


class CreateRolesGroupsView(APIView):
    permission_classes = [IsAdminUser]  # Only allow admins to create groups

    def get(self, request):
        roles = ['medecin', 'administratif', 'infirmier', 'pharmacien','radiologue', 'laboratorien', 'patient']
        created_groups = []

        for role in roles:
            # Check if the group already exists, if not, create it
            group, created = Group.objects.get_or_create(name=role)
            if created:
                created_groups.append(group.name)

        return Response({"created_groups": created_groups}, status=status.HTTP_201_CREATED)


from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@permission_classes([])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if request.user and request.user.is_authenticated:
        return Response({"detail": "Already connected"}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate the user
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)  # This will create the session
        return Response({"detail": "Login successful."}, status=status.HTTP_200_OK)

    return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([])
def logout_view(request):
    logout(request)
    return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([])
def is_connected(request):
    if request.user.is_authenticated:
        return Response({"is_connected": True, "username": request.user.username}, status=status.HTTP_200_OK)
    return Response({"is_connected": False}, status=status.HTTP_200_OK)
