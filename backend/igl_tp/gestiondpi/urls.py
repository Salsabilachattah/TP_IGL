# urls.py
from django.urls import path
from .models import BilanRadiologique
from .views.dpi import PatientView, get_patient_info
from .views.consultation import ResumeView,DiagnostiqueView
from .views.bilan import BilanBiologiqueView,BilanRadiologiqueView
from django.conf import settings
from .views.auth import CreateRolesGroupsView
from .views.medicament import MedicamentListView
from .views.consulterView import *
from .views.infermier import AddInfirmierView
from .views.employe import EmployeListView
from django.conf import settings
from .views.soinsView import *
from django.conf.urls.static import static


urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    # URL for retrieving patient details by NSS
    path('Consultpatient/<int:nss>/', PatientDetailView.as_view(), name='patient-detail-view'),
    # URL for retrieving all patient details without nss
    path('Consultpatient/', PatientDetailView.as_view(), name='all-patient-detail-view'),

    

   path('soins/<int:soin_id>/', SoinView.as_view(), name='soin-detail'),
   path('soins/', SoinView.as_view(), name='soin-create'),
   path('soins/<int:soin_id>/medicaments/', add_soin_medicament, name='add-soin-medicament'),
   path('soins/<int:soin_id>/infirmiers/', add_soin_infermier, name='add-soin-infirmier'),
   path('soins/<int:soin_id>/observations/', add_observation_etat, name='add-observation-etat'),
   path('add-infirmier/', AddInfirmierView.as_view, name='add-infirmier'),

   #for le nom des medicaments deja existants 
   path('medicaments/', MedicamentListView.as_view(), name='medicament-list'),

   #pour rechercher employee par role (pour un role specifique exp: employees/?role=medecin )
   path('employees/', EmployeListView.as_view(), name='employee-list'),


    path('patients/', PatientView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientView.as_view(), name='patient-detail'),
    path('patient/', get_patient_info, name='authenticated-patient-detail'),
    path('consultation/<int:pk>/resume/', ResumeView.as_view(), name='consultation_resume'),
    path('consultation/<int:pk>/diagnostique/', DiagnostiqueView.as_view(), name='edit_diagnostique'),
    path('consultation/<int:pk>/bilanbio/', BilanBiologiqueView.as_view(), name='bilan-detail'),
    path('consultation/<int:pk>/bilanradio/', BilanRadiologiqueView.as_view(), name='bilan-detail'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)