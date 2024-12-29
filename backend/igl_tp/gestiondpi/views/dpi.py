from django.shortcuts import get_object_or_404
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


