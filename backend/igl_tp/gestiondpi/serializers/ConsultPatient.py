from rest_framework import serializers
from ..models import *

class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = '__all__'

class EmployeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Employe
        fields = '__all__'

class TraitementSerializer(serializers.ModelSerializer):
     patient = serializers.StringRelatedField()
     medecin = EmployeSerializer()
     
     class Meta:
         model = Traitement
         fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class OrdonanceMedicamentSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerializer()

    class Meta:
        model = OrdonanceMedicament
        fields = '__all__'


class BilanBiologiqueSerializer(serializers.ModelSerializer):
    laborantin = EmployeSerializer()

    class Meta:
        model = BilanBiologique
        fields = '__all__'

class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    radiologue = EmployeSerializer()

    class Meta:
        model = BilanRadiologique
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'



class OrdonanceSerializer(serializers.ModelSerializer):
     patient = serializers.StringRelatedField()
     medecin = EmployeSerializer()
     medicaments = OrdonanceMedicamentSerializer(many=True, source='ordonancemedicament_set') 

     class Meta: 
        model = Ordonance 
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    patient = serializers.StringRelatedField()
    medecin = EmployeSerializer()
    bilan_biologique = BilanBiologiqueSerializer()
    bilan_radiologique = BilanRadiologiqueSerializer()
    ordonance = OrdonanceSerializer()

    class Meta:
        model = Consultation
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    consultations = ConsultationSerializer(many=True, source='consultation_set') 
    ordonnances = OrdonanceSerializer(many=True, source='ordonance_set')
    traitements = TraitementSerializer(many=True, source='traitement_set')

    class Meta:
        model = Patient
        fields = '__all__'

class OutilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outil
        fields = '__all__'

class ConsultationOutilSerializer(serializers.ModelSerializer):
    consultation = ConsultationSerializer()
    outil = OutilSerializer()

    class Meta:
        model = ConsultationOutil
        fields = '__all__'

class BilanBioTestSerializer(serializers.ModelSerializer):
    bilan_biologique = BilanBiologiqueSerializer()

    class Meta:
        model = BilanBioTest
        fields = '__all__'


class OrdonanceMedicamentSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerializer()

    class Meta:
        model = OrdonanceMedicament
        fields = '__all__'

class ImageRadioSerializer(serializers.ModelSerializer):
    bilan_radiologique = BilanRadiologiqueSerializer()

    class Meta:
        model = ImageRadio
        fields = '__all__'

class SoinSerializer(serializers.ModelSerializer):
    infirmier = EmployeSerializer()

    class Meta:
        model = Soin
        fields = '__all__'

class SoinMedicamentSerializer(serializers.ModelSerializer):
    soin = SoinSerializer()
    infirmier = EmployeSerializer()
    medicament = MedicamentSerializer()

    class Meta:
        model = SoinMedicament
        fields = '__all__'

class SoinInfirmierSerializer(serializers.ModelSerializer):
    soin = SoinSerializer()
    infirmier = EmployeSerializer()

    class Meta:
        model = SoinInfirmier
        fields = '__all__'

class ObservationEtatSerializer(serializers.ModelSerializer):
    soin = SoinSerializer()
    infirmier = EmployeSerializer()

    class Meta:
        model = ObservationEtat
        fields = '__all__'

class TraitementSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    medecin = EmployeSerializer()

    class Meta:
        model = Traitement
        fields = '__all__'
