# urls.py
from django.urls import path
from .views.auth import CreateRolesGroupsView
from .views.dpiView import PatientListCreateAPIView
from .views.consulterView import *


urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    path('patients/', PatientListCreateAPIView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientListCreateAPIView.as_view(), name='patient-detail'),
    # URL for retrieving patient details by NSS
    path('Consultpatient/<int:nss>/', PatientDetailView.as_view(), name='patient-detail-view'),
    # URL for retrieving all patient details without nss
    path('Consultpatient/', PatientDetailView.as_view(), name='all-patient-detail-view'),


]
