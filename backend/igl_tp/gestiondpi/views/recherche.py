from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView
from rest_framework.permissions import *
from rest_framework.decorators import permission_classes
from ..permissions import *
from ..permissions.auth import *
from ..models import Employe
from ..serializers.commun import EmployeSerializer


class EmployeListView(ListAPIView):
    serializer_class = EmployeSerializer

    def get_queryset(self):
        queryset = Employe.objects.all()
        role = self.request.query_params.get('role')
        nom_part = self.request.query_params.get('nom')

        if role is not None:
            queryset = queryset.filter(role=role)
        if nom_part is not None:
            queryset = queryset.filter(nom__icontains=nom_part)

        return queryset

