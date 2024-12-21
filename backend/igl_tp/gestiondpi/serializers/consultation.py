from rest_framework import serializers

from .commun import PatientInfoSerializer, EmployeInfoSerializer
from ..models import Consultation

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['resume']  # Only expose the 'resume' field for editing

class DiagnostiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['diagnostique']  # Only expose the 'diagnostique' field for editing

class ConsultationSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)
    medecin = EmployeInfoSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields =['id','patient' ,'medecin','ordonance' ,'diagnostique' ,'resume', 'created_at','updated_at' ]

class CreerConsultationSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)
    medecin = EmployeInfoSerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = [ 'patient', 'medecin']