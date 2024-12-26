from rest_framework import serializers
from ..models import Consultation

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['resume']  # Only expose the 'resume' field for editing

class DiagnostiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['diagnostique']  # Only expose the 'diagnostique' field for editing
