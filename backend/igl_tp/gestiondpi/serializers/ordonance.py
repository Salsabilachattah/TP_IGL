from rest_framework import serializers
from ..models import Ordonance

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonance
        fields = '__all__'