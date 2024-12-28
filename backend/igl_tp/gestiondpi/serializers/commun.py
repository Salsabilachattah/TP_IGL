from rest_framework import serializers
from ..models import Patient, Employe, Hopital


class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = '__all__'

# Serializer for Patient
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['nss', 'nom', 'prenom','date_de_naissance','adresse','telephone','mutuelle']  # Include ID (nss), name (nom), and surname (prenom)
# Serializer for Laborantin (Employe)

class EmployeSerializer(serializers.ModelSerializer):
    hopital=HopitalSerializer(read_only=True)
    class Meta:
        model = Employe
        fields = ['id', 'nom', 'prenom', 'role','telephone','hopital']  # Include ID, name, surname, and role