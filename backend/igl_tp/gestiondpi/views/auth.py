from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import Group
from rest_framework import status

from ..models import Patient, Employe
from ..serializers.commun import EmployeInfoSerializer
from ..serializers.patient import PatientSerializer


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


#  to directly get patient info when the patient is authenticated
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # only if authenticated and is a patient
def get_user_info(request):
    if request.user.groups.filter(name='patient').exists():
        patient = get_object_or_404(Patient, user=request.user)
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Check if the user is an employee (excluding Django admin users)
    elif not request.user.is_staff:  # Ensure the user is not an admin
        employee = get_object_or_404(Employe, user=request.user)
        serializer = EmployeInfoSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # If the user is neither a patient nor a regular employee, return a 403 Forbidden response
    return Response({"detail": "No info for super user"}, status=status.HTTP_403_FORBIDDEN)