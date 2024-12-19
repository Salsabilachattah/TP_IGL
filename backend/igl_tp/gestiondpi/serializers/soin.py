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

# Serializer for Medicament 
class MedicamentInfoSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Medicament 
        fields = ['nom'] # Include name 
# Serializer for SoinMedicament 
class SoinMedicamentSerializer(serializers.ModelSerializer): 
    infirmier = EmployeInfoSerializer(read_only=True) 
    medicament = MedicamentInfoSerializer(read_only=False) 
    class Meta: model = SoinMedicament 
    fields = ['infirmier', 'medicament', 'dose', 'date_time'] 
# Serializer for SoinInfirmier 
class SoinInfirmierSerializer(serializers.ModelSerializer): 
    infirmier = EmployeInfoSerializer(read_only=True) 
    class Meta: 
        model = SoinInfirmier 
        fields = ['infirmier', 'description', 'date_time'] 
        # Serializer for ObservationEtat 

class ObservationEtatSerializer(serializers.ModelSerializer): 
    infirmier = EmployeInfoSerializer(read_only=True) 
    class Meta: 
        model = ObservationEtat 
        fields = ['infirmier', 'observation', 'date_time'] 
# Main serializer for the Soin model 
class SoinSerializer(serializers.ModelSerializer): 
    patient = PatientInfoSerializer(read_only=True)
    infirmier = EmployeInfoSerializer(read_only=True) 
    soin_medicament = SoinMedicamentSerializer(many=True, read_only=True, source='soinmedicament_set') 
    soin_infirmier = SoinInfirmierSerializer(many=True, read_only=True, source='soininfirmier_set') 
    observation_etat = ObservationEtatSerializer(many=True, read_only=True, source='observationetat_set') 
    class Meta: 
        model = Soin 
        fields = [ 'patient', 'infirmier', 'observation', 'created_at', 'updated_at', 'soin_medicament', 'soin_infirmier', 'observation_etat']