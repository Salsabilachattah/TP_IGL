from rest_framework import serializers
from ..models import *

# Serializer for Patient
class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['nss', 'nom', 'prenom']  # Include ID (nss), name (nom), and surname (prenom)


# Serializer for infermier (Employe)
class EmployeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        fields = ['id', 'nom', 'prenom', 'role']  # Include ID, name, surname, and role

        
# Serializer for SoinMedicament //changed
class SoinMedicamentSerializer(serializers.ModelSerializer):
   
    class Meta: 
        model = SoinMedicament
        fields = ['soin','infirmier', 'medicament', 'dose', 'date_time'] 
    


# Serializer for SoinInfirmier //changed
class SoinInfirmierSerializer(serializers.ModelSerializer):

    class Meta:
        model = SoinInfirmier
        fields = ['infirmier','soin', 'description', 'date_time']


# Serializer for ObservationEtat

class ObservationEtatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObservationEtat
        fields = ['infirmier','soin', 'observation', 'date_time']

# Main serializer for the Soin model
class SoinSerializer(serializers.ModelSerializer):
    infirmier = EmployeInfoSerializer(read_only=True)
    soin_medicament = SoinMedicamentSerializer(many=True, read_only=True, source='soinmedicament_set')
    soin_infirmier = SoinInfirmierSerializer(many=True, read_only=True, source='soininfirmier_set')
    observation_etat = ObservationEtatSerializer(many=True, read_only=True, source='observationetat_set')

    class Meta:
        model = Soin
        fields = ['id', 'patient', 'infirmier', 'observation', 'created_at', 'updated_at', 'soin_medicament',
                  'soin_infirmier', 'observation_etat']
        extra_kwargs = {
            'observation': {'required': False},  # Makes 'observation' optional
        }


