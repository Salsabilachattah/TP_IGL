from rest_framework import serializers
from .commun import PatientSerializer, EmployeSerializer
from ..models import BilanBiologique, Patient, Employe, BilanRadiologique, BilanBioTest, ImageRadio



# Serializer for BilanBiologique
class BilanBioTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBioTest
        fields = ['type', 'valeur']  # Include the fields you want to serialize


# Serializer for the BilanBiologique model
class BilanBioSerializer(serializers.ModelSerializer):
    # Nested serializers for patient and laborantin (staff)
    patient = PatientSerializer(read_only=True)
    laborantin = EmployeSerializer(read_only=True)

    # Related tests using the reverse relation `tests`
    tests = BilanBioTestSerializer(many=True, read_only=True)

    class Meta:
        model = BilanBiologique
        fields = [
            'consultation', 'patient', 'laborantin', 'description',
            'resultat', 'valide', 'created_at', 'updated_at', 'tests'
        ]

class BilanBioEditSerializer(serializers.ModelSerializer):
    # Nested serializers for patient and laborantin (staff)
    patient = PatientSerializer(read_only=True)
    laborantin = EmployeSerializer(read_only=True)

    # Related tests using the reverse relation `tests`
    tests = BilanBioTestSerializer(many=True, read_only=True)

    class Meta:
        model = BilanBiologique
        fields = [
            'resultat', 'valide'
        ]

class ImageRadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageRadio
        fields = ['image']  # Include the fields you want to return (e.g., image path, ID)

# Main serializer for BilanRadiologique
class BilanRadioSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)  # Nested serializer for patient information
    radiologue = EmployeSerializer(read_only=True)  # Nested serializer for radiologue information
    images = ImageRadioSerializer(many=True, read_only=True)  # Nested serializer for related images

    class Meta:
        model = BilanRadiologique
        fields = ['consultation', 'patient', 'radiologue', 'description', 'compte_rendu', 'images', 'valide', 'created_at', 'updated_at']

class BilanRadioEditSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)  # Nested serializer for patient information
    radiologue = EmployeSerializer(read_only=True)  # Nested serializer for radiologue information
    images = ImageRadioSerializer(many=True, read_only=True)  # Nested serializer for related images

    class Meta:
        model = BilanRadiologique
        fields = ['compte_rendu', 'valide']


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBioTest
        fields = ['id', 'type', 'valeur']  # Include 'id', 'type', and 'valeur'
        read_only_fields = ['id']  # Make 'id' read-only (user cannot provide it during creation)
