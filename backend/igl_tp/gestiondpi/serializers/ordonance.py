from rest_framework import serializers
from ..models import Ordonance, OrdonanceMedicament


class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonance
        fields = '__all__'

class OrdonnanceMedicamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model =  OrdonanceMedicament
        fields = '__all__'