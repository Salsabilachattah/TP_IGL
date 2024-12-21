from rest_framework import serializers
from ..models import  Patient, Employe



# Serializer for Patient
class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['nss', 'nom', 'prenom']  # Include ID (nss), name (nom), and surname (prenom)

# Serializer for Laborantin (Employe)
class EmployeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        fields = ['id', 'nom', 'prenom', 'role']  # Include ID, name, surname, and role
