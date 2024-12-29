# urls.py
from django.urls import path

from .views.auth import CreateRolesGroupsView, login_view, logout_view,is_connected,get_user_info
from .views.dpi import PatientView, get_patient_par_nss
from .views.consultation import edit_consultation, ConsultationView
from .views.bilan import BilanBiologiqueView, BilanRadiologiqueView, get_last_two_bilans, add_bilanradio_image, \
    add_bilanbio_test, take_bilan_bio, take_bilan_radio
from django.conf import settings
from django.conf.urls.static import static

from .views.ordonance import creer_ordonance, SGPHView
from django.urls import re_path
from rest_framework import permissions, authentication
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views.recherche import EmployeListView, MedicamentListView
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
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('is_connected/', is_connected, name='is_connected'),
    path('me/', get_user_info, name='me'),
    # admin
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    # patient
    path('patients/', PatientView.as_view(), name='patients'),
    path('patients/<int:nss>/', get_patient_par_nss, name='patient-detail'),
    # consultation et bilans
    path('patients/<int:nss>/consultation/', ConsultationView.as_view(), name='consultation'),
    path('patients/<int:nss>/last2bilans', get_last_two_bilans, name='bilan-detail'),
    path('consultations/<int:pk>/', edit_consultation, name='consultation-resume'),
    path('consultations/<int:pk>/bilanbio/', BilanBiologiqueView.as_view(), name='bilan-detail'),
    path('consultations/<int:pk>/bilanbio/take', take_bilan_bio, name='bilan-bio-take'),
    path('consultations/<int:pk>/bilanbio/test', add_bilanbio_test , name='bilan-test'),
    path('consultations/<int:pk>/bilanradio/', BilanRadiologiqueView.as_view(), name='bilan-radio-detail'),
    path('consultations/<int:pk>/bilanradio/take', take_bilan_radio, name='bilan-radio-take'),
    path('consultations/<int:pk>/bilanradio/radio', add_bilanradio_image, name='bilan-detail'),
    # Ordonance ET SGPH
    path('patients/<int:nss>/ordonnance/', creer_ordonance, name='ordonnance'),
    path('sgph/', SGPHView.as_view(), name='pharmacien'),
    # soin
    path('soins/<int:soin_id>/', SoinView.as_view(), name='soin-detail'),
    path('soins/', SoinView.as_view(), name='soin-create'),
    path('soins/<int:soin_id>/medicaments/', add_soin_medicament, name='add-soin-medicament'),
    path('soins/<int:soin_id>/infirmiers/', add_soin_infermier, name='add-soin-infirmier'),
    path('soins/<int:soin_id>/observations/', add_observation_etat, name='add-observation-etat'),

    # recherche
    path('medicaments/', MedicamentListView.as_view(), name='medicament-list'),
    path('employees/', EmployeListView.as_view(), name='employee-list'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)