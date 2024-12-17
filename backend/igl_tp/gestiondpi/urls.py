# urls.py
from django.urls import path

from .models import BilanRadiologique
from .views.auth import CreateRolesGroupsView
from .views.dpi import PatientView, get_patient_info
from .views.consultation import ResumeView,DiagnostiqueView
from .views.bilan import BilanBiologiqueView, BilanRadiologiqueView, get_last_two_bilans
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    path('patients/', PatientView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientView.as_view(), name='patient-detail'),
    path('patient/', get_patient_info, name='authenticated-patient-detail'),
    path('consultation/<int:pk>/resume/', ResumeView.as_view(), name='consultation_resume'),
    path('consultation/<int:pk>/diagnostique/', DiagnostiqueView.as_view(), name='edit_diagnostique'),
    path('consultation/<int:pk>/bilanbio/', BilanBiologiqueView.as_view(), name='bilan-detail'),
    path('patient/<int:patient_id>/last2bilans', get_last_two_bilans, name='bilan-detail'),
    path('consultation/<int:pk>/bilanradio/', BilanRadiologiqueView.as_view(), name='bilan-detail'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)