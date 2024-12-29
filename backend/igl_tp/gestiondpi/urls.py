# urls.py
from django.urls import path
from .views.auth import CreateRolesGroupsView
from .views.dpiView import  PatientListCreateAPIView
from .views.creerOrdonnanceView import OrdonnanceCreateAPIView
from .views.pharmacienView import PharmacienView

urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    path('patients/', PatientListCreateAPIView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientListCreateAPIView.as_view(), name='patient-detail'),
    path('patients/<int:nss>/ordonnances/', OrdonnanceCreateAPIView.as_view(), name='ordonnances'),
    path('pharmacien/', PharmacienView.as_view(), name='pharmacien'),
]
