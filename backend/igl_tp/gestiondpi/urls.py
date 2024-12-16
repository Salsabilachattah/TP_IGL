# urls.py
from django.urls import path
from .views.auth import CreateRolesGroupsView
from .views.dpiView import PatientListCreateAPIView
from views.consultation import ResumeView,DiagnostiqueView
from .views.bilan import BilanBiologiqueView,BilaRadiologiqueView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
    path('patients/', PatientListCreateAPIView.as_view(), name='patients'),
    path('patients/<int:nss>/', PatientListCreateAPIView.as_view(), name='patient-detail'),
    path('consultation/<int:pk>/resume/', ResumeView.as_view(), name='consultation_resume'),
    path('consultation/<int:pk>/diagnostique/', DiagnostiqueView.as_view(), name='edit_diagnostique'),
    path('consultation/<int:pk>/bilanbio/', BilanBiologiqueView.as_view(), name='bilan-detail'),
    path('consultation/<int:pk>/bilanradio/', BilanBiologiqueView.as_view(), name='bilan-detail'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)