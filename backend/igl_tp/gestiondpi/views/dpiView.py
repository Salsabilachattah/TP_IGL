from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
from django.http import HttpResponse
from qrcode import *
from django.contrib.auth.models import User
from ..models import Patient
from ..serializers import PatientSerializer , OrdonnanceSerializer
from ..permissions import *
from django.http import FileResponse
from ..permissions import IsAdministratif, IsMedecin

class PatientListCreateAPIView(APIView):
    def get(self, request, nss=None):
        if nss and (IsAdministratif(request.user) or IsMedecin(request.user)) and request.user.is_authenticated:
            # Fetch a single patient by NSS
            try:
                patient = Patient.objects.get(nss=nss)
                serializer = PatientSerializer.PatientSerializer(patient)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Patient.DoesNotExist:
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Fetch all patients
            patients = Patient.objects.all()
            serializer = PatientSerializer.PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    # permission_classes = [IsAdministratif, IsMedecin]
    def post(self, request):
     if IsAdministratif(request.user) or IsMedecin(request.user):
        # to add a new patient
        patient_data = request.data

        # Create a new User dynamically for the patient
        password = f"patient_{patient_data.get('nss')}"
        username = f"{patient_data.get('nom').lower()}_{patient_data.get('prenom').lower()}"
        user = User.objects.create_user(username=username, password=password)

        # Attach the created User to the Patient data
        patient_data['user'] = user.id

        serializer = PatientSerializer.PatientSerializer(data=patient_data)
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
     
class OrdonnanceCreateAPIView(APIView):
        def post(self, request, nss):
            if IsMedecin(request.user) and request.user.is_authenticated:
                try:
                    patient = Patient.objects.get(nss=nss)
                except Patient.DoesNotExist:
                    return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

                ordonnance_data = request.data
                ordonnance_data['patient'] = patient.id
                ordonnance_data['medecin'] = request.user.id

                serializer = OrdonnanceSerializer.OrdonnanceSerializer(data=ordonnance_data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)