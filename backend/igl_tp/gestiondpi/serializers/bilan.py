from rest_framework import serializers
from ..models import BilanBiologique, Patient, Employe, BilanRadiologique, BilanBioTest, ImageRadio


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

# Serializer for BilanBiologique
class BilanBioTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBioTest
        fields = ['type', 'valeur']  # Include the fields you want to serialize


# Serializer for the BilanBiologique model
class BilanBioSerializer(serializers.ModelSerializer):
    # Nested serializers for patient and laborantin (staff)
    patient = PatientInfoSerializer(read_only=True)
    laborantin = EmployeInfoSerializer(read_only=True)

    # Related tests using the reverse relation `tests`
    tests = BilanBioTestSerializer(many=True, read_only=True)

    class Meta:
        model = BilanBiologique
        fields = [
            'consultation', 'patient', 'laborantin', 'description',
            'resultat', 'valide', 'created_at', 'updated_at', 'tests'
        ]

class ImageRadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageRadio
        fields = ['image']  # Include the fields you want to return (e.g., image path, ID)

# Main serializer for BilanRadiologique
class BilanRadioSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)  # Nested serializer for patient information
    radiologue = EmployeInfoSerializer(read_only=True)  # Nested serializer for radiologue information
    images = ImageRadioSerializer(many=True, read_only=True)  # Nested serializer for related images

    class Meta:
        model = BilanRadiologique
        fields = ['consultation', 'patient', 'radiologue', 'description', 'compte_rendu', 'images', 'valide', 'created_at', 'updated_at']