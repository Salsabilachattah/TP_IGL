from rest_framework import serializers

from .commun import PatientSerializer, EmployeSerializer
from ..models import Consultation

class ConsultationEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields =['diagnostique' ,'resume' ]


class ConsultationSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    medecin = EmployeSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields =['id','patient' ,'medecin','ordonance' ,'diagnostique' ,'resume', 'created_at','updated_at' ]
