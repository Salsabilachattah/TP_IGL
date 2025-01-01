# Description: This file contains the tests for the search patient feature.
# The search patient feature allows the user to search for a patient by their nss.
# a database is created with two patients, and the tests are run to check if the search patient feature works correctly.
# to run the tests, use the command: python manage.py test gestiondpi.tests
import os
import unittest
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from gestiondpi.models import Patient

os.environ['DJANGO_SETTINGS_MODULE'] = 'igl_tp.settings'
import django
django.setup()

class TestSearchPatient(TestCase):

    def setUp(self):
        
        self.client = Client()
        self.user1 = User.objects.create_user(username='testuser1', password='123456')
        self.user2 = User.objects.create_user(username='testuser2', password='123456')
        self.client.login(username='testuser1', password='123456')
        self.patient1 = Patient.objects.create(nss=123456789, user=self.user1, nom='John', prenom='Doe', date_de_naissance='1990-01-01')
        self.patient2 = Patient.objects.create(nss=987654321, user=self.user2, nom='Jane', prenom='Doe', date_de_naissance='1992-02-02')

    def test_search_patient_success(self):
        nss_test = 123456789
        response = self.client.get(reverse('patient-detail', kwargs={'nss': nss_test}))
        self.assertEqual(response.status_code, 200)
        if Patient.objects.filter(nss=nss_test).exists():
            print(f"[SUCCESS] Patient with nss = {nss_test} exists in the database")
            print( Patient.objects.filter(nss=nss_test).values())
        else :
            print(f"[ERROR] Patient with nss = {nss_test} does not exist in the database")

    def test_search_patient_not_found(self):
        nss_test = 111111111
        response = self.client.get(reverse('patient-detail', kwargs={'nss': nss_test}))
        self.assertEqual(response.status_code, 404)
        if Patient.objects.filter(nss=nss_test).exists():
            print(f"[ERROR] Patient with nss = {nss_test} exists in the database")
        else :
            print(f"[SUCCESS] Patient with nss = {nss_test} does not exist in the database")

if __name__ == '__main__':
    unittest.main()