from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class SoinTests(APITestCase):
    def setUp(self):
        # Create a user and authenticate
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        # Create a hopital
        self.hopital = Hopital.objects.create(name="Hopital 1")
        
        # Create a patient
        self.patient = Patient.objects.create(nss=123456789, user=self.user, nom="John", prenom="Doe", date_de_naissance="1990-01-01")
        
        # Create an employe (infirmier)
        self.infirmier = Employe.objects.create(user=self.user, hopital=self.hopital, nom="Jane", prenom="Smith", role="infirmier")
        
    def test_create_soin(self):
        url = reverse('soin-create')
        data = {
            "patient": self.patient.pk,
            "infirmier": self.infirmier.pk,
            "observation": "Observation text"
        }
        response = self.client.post(url, data, format='json')
        print(f'Create Soin Response Data: {response.data}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_retrieve_soin(self):
        # Create a soin instance
        soin = Soin.objects.create(patient=self.patient, infirmier=self.infirmier, observation="Observation text")
        
        url = reverse('soin-detail', kwargs={'soin_id': soin.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(f'Retrieve Soin Response Data: {response.data}')
        self.assertEqual(response.data['observation'], "Observation text")
        
    def test_update_soin(self):
        # Create a soin instance
        soin = Soin.objects.create(patient=self.patient, infirmier=self.infirmier, observation="Observation text")
        
        url = reverse('soin-detail', kwargs={'soin_id': soin.pk})
        data = {
            "observation": "Updated observation text"
        }
        response = self.client.put(url, data, format='json')
        print(f'Update Soin Response Data: {response.data}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['observation'], "Updated observation text")
        
    def test_delete_soin(self):
        # Create a soin instance
        soin = Soin.objects.create(patient=self.patient, infirmier=self.infirmier, observation="Observation text")
        
        url = reverse('soin-detail', kwargs={'soin_id': soin.pk})
        response = self.client.delete(url)
        print(f'Delete Soin Response Status Code: {response.status_code}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
