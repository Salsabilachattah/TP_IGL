from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
from django.http import HttpResponse
from qrcode import *
from django.contrib.auth.models import User, Group
from ..models import Patient
from ..permissions.auth import IsPatient
from ..permissions.dpi import PatientViewPermissions
from ..serializers.patient import PatientSerializer
from ..permissions import *
from django.http import FileResponse


class PatientView(APIView):
    permission_classes = [PatientViewPermissions]

    # refactor by removing try,catch and using 'get_object_or_404'
    def get(self, request, nss=None):
        if nss:
            # Fetch a single patient by NSS
            patient = get_object_or_404(Patient, nss=nss)
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Fetch all patients
            patients = Patient.objects.all()
            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        # to add a new patient
        patient_data = request.data

        # Create a new User dynamically for the patient
        password = f"patient_{patient_data.get('nss')}"
        username = f"{patient_data.get('nom').lower()}_{patient_data.get('prenom').lower()}"
        user = User.objects.create_user(username=username, password=password)

        # add the user to 'patient' group for permissions stuff
        user.groups.add(Group.objects.get(name='patient'))

        # Attach the created User to the Patient data
        patient_data['user'] = user.id

        serializer = PatientSerializer(data=patient_data)
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

#  to directly get patient info when the patient is authenticated
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsPatient])  # only if authenticated and is a patient
def get_patient_info(request, pk):
    patient = get_object_or_404(Patient, user__id=request.user.id)
    serializer = PatientSerializer(patient)
    return Response(serializer.data, status=status.HTTP_200_OK)