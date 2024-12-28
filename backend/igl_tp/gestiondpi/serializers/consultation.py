from rest_framework import serializers

from .commun import PatientInfoSerializer, EmployeInfoSerializer
from ..models import Consultation

class ConsultationEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields =['id','diagnostique' ,'resume' ]


class ConsultationSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)
    medecin = EmployeInfoSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields =['id','patient' ,'medecin','ordonance' ,'diagnostique' ,'resume', 'created_at','updated_at' ]
