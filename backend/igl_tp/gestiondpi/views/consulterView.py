from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import *
from ..serializers.ConsultPatient import *

class PatientDetailView(APIView):
  def get(self, request, nss=None):
     if nss: 
      # Fetch a single patient by NSS : tested
        try:
            patient = Patient.objects.get(nss=nss) 
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist: 
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND) 
     else:
      # Fetch all patients : i guess it works ?: it showed one patient in the body, but in the pretty thing at buttom idk what it showed all patients with the treatement exct as vide
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True) 
        return Response(serializer.data,status=status.HTTP_200_OK)

   


   