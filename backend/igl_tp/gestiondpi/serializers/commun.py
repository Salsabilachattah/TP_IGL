from rest_framework import serializers
from ..models import Patient, Employe, Hopital, Medicament


class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = '__all__'

# Serializer for Patient
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'  # Include ID (nss), name (nom), and surname (prenom)
# Serializer for Laborantin (Employe)

class EmployeSerializer(serializers.ModelSerializer):
    hopital=HopitalSerializer(read_only=True)
    class Meta:
        model = Employe
        fields = '__all__'  # Include ID, name, surname, and role

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'