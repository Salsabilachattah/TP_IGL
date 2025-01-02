from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
from qrcode import *
from django.contrib.auth.models import User, Group
from ..models import Patient
from ..permissions.dpi import PatientViewPermissions
from ..serializers.commun import PatientSerializer
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt


class PatientView(APIView):
    permission_classes = [PatientViewPermissions]

    @swagger_auto_schema(
        tags=["patients"],
        operation_summary="Get all patients"
    )
    @csrf_exempt
    def get(self, request):
        # Fetch all patients
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        tags=["patients"],
        operation_summary="Create a new patient and generate a QR code",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'nss': openapi.Schema(type=openapi.TYPE_INTEGER, description='Numéro de Sécurité Sociale', example=1234567890),
                'nom': openapi.Schema(type=openapi.TYPE_STRING, description='Patient surname', example='Doe'),
                'prenom': openapi.Schema(type=openapi.TYPE_STRING, description='Patient first name', example='John'),
                'date_de_naissance': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE, description='Patient birth date', example='1990-01-01'),
                'adresse': openapi.Schema(type=openapi.TYPE_STRING, description='Patient address', example='123 Main St, City, Country'),
                'telephone': openapi.Schema(type=openapi.TYPE_STRING, description='Patient phone number', example='+1234567890'),
                'mutuelle': openapi.Schema(type=openapi.TYPE_STRING, description='Patient health insurance provider', example='Health Insurance Co.'),
            },
            required=['nss', 'nom', 'prenom', 'date_de_naissance'],
        ),
        responses={
            200: openapi.Response(
                description="QR code generated successfully",
                content={
                    "application/octet-stream": {
                        "schema": openapi.Schema(
                            type="string",
                            format="binary",
                            description="Generated QR code image file"
                        )
                    }
                }
            ),
            400: openapi.Response(
                description="Invalid data provided",
            )
        }
    )
    @csrf_exempt
    def post(self, request):
        if request.data.get('nss') is None or request.data.get('nom') is None or request.data.get('prenom') is None:
            return Response({"error": "Missing data"}, status=status.HTTP_400_BAD_REQUEST)
        # Create a new User dynamically for the patient
        password = f"patient_{request.data.get('nss')}"
        username = f"{request.data.get('nom').lower()}_{request.data.get('prenom').lower()}"
        user = User.objects.create_user(username=username, password=password)

        # add the user to 'patient' group for permissions stuff
        user.groups.add(Group.objects.get(name='patient'))

        serializer = PatientSerializer(user=user,data=request.data)
        if serializer.is_valid():
            patient = serializer.save()

            # Generate QR code for the patient's NSS
            qr = make(patient.nss)

            # Save the QR code to a memory buffer
            buffer = BytesIO()
            qr.save(buffer)
            buffer.seek(0)

            # Create a FileResponse to send the QR code as a file
            return FileResponse(buffer, as_attachment=True, filename=f"patient_{patient.nss}_qrcode.png")


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method="GET",
    tags=["patients"],
    operation_summary="Get patient by nss"
)
@api_view(['GET'])
@csrf_exempt
@permission_classes([PatientViewPermissions])
def get_patient_par_nss(request, nss):
        # Fetch a single patient by NSS
        patient = get_object_or_404(Patient, nss=nss)
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)