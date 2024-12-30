from rest_framework import serializers
from ..models import Ordonance, OrdonanceMedicament, Medicament


class OrdonnanceMedicamentsSerializer(serializers.ModelSerializer):
    medicament_id = serializers.PrimaryKeyRelatedField(source='medicament', queryset=Medicament.objects.all())
    dose = serializers.FloatField()
    duree = serializers.IntegerField()

    class Meta:
        model = OrdonanceMedicament
        fields = ['medicament_id', 'dose', 'duree']


class OrdonnanceSerializer(serializers.ModelSerializer):
    # List of OrdonnanceMedicaments
    medicaments = OrdonnanceMedicamentsSerializer(many=True, read_only=True)

    class Meta:
        model = Ordonance
        fields = ['valide', 'medecin', 'patient', 'date', 'medicaments']