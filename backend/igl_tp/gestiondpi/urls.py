# urls.py
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views.auth import CreateRolesGroupsView, get_user_info
from .views.dpi import PatientView, get_patient_par_nss
from .views.consultation import ConsultationDetailView, ConsultationAllView
from .views.bilan import BilanBiologiqueView, BilanRadiologiqueView, get_last_two_bilans, add_bilanradio_image, \
    add_bilanbio_test, take_bilan_bio, take_bilan_radio, recherche_bilan_bio,recherche_bilan_radio
from django.conf import settings
from django.conf.urls.static import static

from .views.ordonance import creer_ordonance,get_ordonances_by_nss, get_all_non_validated_ordonances, validate_ordonance
from django.urls import re_path
from rest_framework import permissions, authentication
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views.recherche import EmployeListView
from .views.soin import *

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
    authentication_classes=[],
)

urlpatterns = [
    # doc
    path('docs.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # auth
    path('me/', get_user_info, name='me'),
    # admin
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    # patient
    path('patients/', PatientView.as_view(), name='patients'),
    path('patients/<int:nss>/', get_patient_par_nss, name='patient-detail'),
    # consultation
    path('patients/<int:nss>/consultation/', ConsultationAllView.as_view(), name='consultation'),
    path('consultations/<int:pk>/', ConsultationDetailView.as_view(), name='consultation-resume'),
    # bilan bio
    path('patients/<int:nss>/bilanbio/lasttwo/', get_last_two_bilans, name='bilan-detail'),
    path('bilanbio/', recherche_bilan_bio, name='bilan-bio-detail'),
    path('bilanbio/<int:pk>/', BilanBiologiqueView.as_view(), name='bilan-detail'),
    path('bilanbio/<int:pk>/take/', take_bilan_bio, name='bilan-bio-take'),
    path('bilanbio/<int:pk>/add_test/', add_bilanbio_test , name='bilan-test'),
    # bilan radio
    path('bilanradio/',recherche_bilan_radio, name = 'bilan-radio-detail'),
    path('bilanradio/<int:pk>/', BilanRadiologiqueView.as_view(), name='bilan-radio-detail'),
    path('bilanradio/<int:pk>/add_image/', add_bilanradio_image, name='bilan-detail'),
    path('bilanradio/<int:pk>/take/', take_bilan_radio, name='bilan-radio-take'),
    # Ordonance ET SGPH
    path('consultation/<int:pk>/ordonnance/', creer_ordonance, name='ordonnance'),
    path('patients/<int:nss>/ordonnances/', get_ordonances_by_nss, name='ordonnance'),
    path('ordonance/not_validated/', get_all_non_validated_ordonances, name='pharmacien'),
    path('ordonance/<int:pk>/', validate_ordonance, name='pharmacien'),
    # soin
    path('soins/<int:soin_id>/', SoinView.as_view(), name='soin-detail'),
    path('soins/', create_soin, name='soin-create'),
    path('soins/<int:soin_id>/medicaments/', add_soin_medicament, name='add-soin-medicament'),
    # Get Medicaments of a Specific Soin
    path('soin/<int:soin_id>/medicaments/get/', get_soin_medicaments, name='get_soin_medicaments'),
    # Add SoinInfirmier to Soin
    path('soins/<int:soin_id>/soin_infirmiers/', add_soin_infermier, name='add-soin-infirmier'),
    # Get SoinInfirmiers of a Specific Soin
    path('soin/<int:soin_id>/soin_infirmiers/get/', get_soin_infirmiers, name='get_soin_infirmiers'),
    # Add Observation Etat to Soin
    path('soins/<int:soin_id>/observations/', add_observation_etat, name='add-observation-etat'),
    # Get Observations of a Specific Soin
    path('soin/<int:soin_id>/observations/get/', get_observation_etats, name='get_observation_etats'),
    
    path('patients/<int:nss>/soins/', get_soins_par_nss, name='get_soin_par_nss'),
    # recherche
    path('employees/', EmployeListView.as_view(), name='medicament--role-nom'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
