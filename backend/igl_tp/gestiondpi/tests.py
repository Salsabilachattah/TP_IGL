from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import *
from django.contrib.auth.models import User

class PatientDetailTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='johndoe', password='password123')
        self.hopital = Hopital.objects.create(name="Hospital A")
        self.employe = Employe.objects.create(
            user=self.user,
            hopital=self.hopital,
            nom="Smith",
            prenom="James",
            role="medecin",
            telephone="555-5557"
        )
        self.patient = Patient.objects.create(
            nss=123456789,
            user=self.user,
            nom="Doe",
            prenom="John",
            date_de_naissance="1980-01-01",
            adresse="123 Main St",
            telephone="555-5555",
            mutuelle="InsuranceCo",
        )

        self.ordonance = Ordonance.objects.create( 
            patient=self.patient, 
            medecin=self.employe, 
            date="2023-01-01" 
        )
        self.consultation = Consultation.objects.create( 
            patient=self.patient, 
            medecin=self.employe, 
            date="2023-01-01T12:00:00Z", 
            resume="Patient diagnosed with hypertension", 
            bilan_biologique=None, 
            bilan_radiologique=None,
            ordonance=self.ordonance
               
        ) 
        self.traitement = Traitement.objects.create(
            patient=self.patient,
            medecin=self.employe
              
        )

    def test_get_patient_details_success(self):
        url = reverse('patient-detail-view', args=[self.patient.nss])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nss'], self.patient.nss)
        self.assertIn('consultations', response.data) 
        self.assertIn('ordonnances', response.data)
        self.assertIn('traitements', response.data)
        # Print the response data for verification
        print("Patient Details:", response.data)

    def test_get_patient_details_not_found(self):
        url = reverse('patient-detail-view', args=[999999999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Patient not found')

  