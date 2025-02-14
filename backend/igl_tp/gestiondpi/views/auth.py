from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import Group
from rest_framework import status
from ..models import Patient, Employe
from ..serializers.commun import EmployeSerializer,PatientSerializer


class CreateRolesGroupsView(APIView):
    permission_classes = [IsAdminUser]  # Only allow admins to create groups

    @swagger_auto_schema(
        tags=["admin stuff (do not use)"]
    )
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
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status

login_body_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'username': openapi.Schema(type=openapi.TYPE_STRING),
        'password': openapi.Schema(type=openapi.TYPE_STRING),
    },
    required=['username', 'password'],
)

#  to directly get patient info when the patient is authenticated
@swagger_auto_schema(
    method='get',
    tags=["authentication"]
)
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
        serializer = EmployeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # If the user is neither a patient nor a regular employee, return a 403 Forbidden response
    return Response({"detail": "No info for super user"}, status=status.HTTP_403_FORBIDDEN)