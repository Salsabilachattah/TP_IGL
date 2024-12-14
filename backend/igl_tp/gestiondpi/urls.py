# urls.py
from django.urls import path
from .views.auth import CreateRolesGroupsView
from .views.dpiView import PatientListCreateAPIView
from views.consultation import ResumeView,DiagnostiqueView

urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    path('patients/', PatientListCreateAPIView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientListCreateAPIView.as_view(), name='patient-detail'),
    path('consultation/<int:id>/resume/', ResumeView.as_view(), name='consultation_resume'),
    path('consultation/<int:id>/diagnostique/', DiagnostiqueView.as_view(), name='edit_diagnostique'),
]
