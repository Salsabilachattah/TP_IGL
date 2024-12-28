# urls.py
from django.urls import path
from .models import BilanRadiologique
from .views.dpi import PatientView, get_patient_info
from .views.consultation import ResumeView,DiagnostiqueView
from .views.bilan import BilanBiologiqueView,BilanRadiologiqueView
from .views.auth import CreateRolesGroupsView
from .views.medicament import MedicamentListView
from .views.consulterView import *
from .views.infermier import AddInfirmierView
from .views.employe import EmployeListView
from .views.auth import CreateRolesGroupsView, login_view, logout_view,is_connected,get_user_info
from .views.dpi import PatientView
from .views.consultation import edit_consultation, ConsultationView
from .views.bilan import BilanBiologiqueView, BilanRadiologiqueView, get_last_two_bilans, add_bilanradio_image, \
    add_bilanbio_test, take_bilan_bio, take_bilan_radio
from django.conf import settings
from .views.soinsView import *
from django.conf.urls.static import static

from .views.ordonance import creer_ordonance, SGPHView

urlpatterns = [
    # auth
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('is_connected/', is_connected, name='is_connected'),
    path('me/', get_user_info, name='user-detail'),
    # admin
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


    # patient
    path('patients/', PatientView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientView.as_view(), name='patient-detail'),
    # consultation et bilans
    path('patients/<int:nss>/consultation/', ConsultationView.as_view(), name='consultation'),
    path('patients/<int:nss>/last2bilans', get_last_two_bilans, name='bilan-detail'),
    path('consultations/<int:pk>/', edit_consultation, name='consultation-resume'),
    path('consultations/<int:pk>/bilanbio/', BilanBiologiqueView.as_view(), name='bilan-detail'),
    path('consultations/<int:pk>/bilanbio/take', take_bilan_bio, name='bilan-bio-take'),
    path('consultations/<int:pk>/bilanbio/test', add_bilanbio_test , name='bilan-detail'),
    path('consultations/<int:pk>/bilanradio/', BilanRadiologiqueView.as_view(), name='bilan-radio-detail'),
    path('consultations/<int:pk>/bilanradio/take', take_bilan_radio, name='bilan-radio-take'),
    path('consultations/<int:pk>/bilanradio/radio', add_bilanradio_image, name='bilan-detail'),
    # Ordonance ET SGPH
    path('patients/<int:nss>/ordonnance/', creer_ordonance, name='ordonnance'),
    path('sgph/', SGPHView.as_view(), name='pharmacien'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)