from rest_framework import serializers
from ..models import Ordonance, OrdonanceMedicament

class OrdonnanceCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ordonance
        fields = ["id",'valide', 'medecin', 'patient']

class OrdonnanceMedicamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdonanceMedicament
        fields = ["ordonance",'medicament', 'dose', 'duree']


class OrdonnanceSerializer(serializers.ModelSerializer):
    # List of OrdonnanceMedicaments
    medicaments = OrdonnanceMedicamentsSerializer(many=True, read_only=True)

    class Meta:
        model = Ordonance
        fields = ['valide', 'medecin', 'patient',  'medicaments']

