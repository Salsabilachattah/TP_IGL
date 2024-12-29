from rest_framework.generics import ListAPIView
from rest_framework.permissions import *
from rest_framework.decorators import permission_classes
from ..permissions import *
from ..permissions.auth import *
from ..models import Employe, Medicament
from ..serializers.commun import EmployeSerializer,MedicamentSerializer


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


class MedicamentListView(ListAPIView):
    # permission_classes = [IsInfirmier,IsMedecin]

    serializer_class = MedicamentSerializer

    def get_queryset(self):
        queryset = Medicament.objects.all()

        # url example: /Medicaments?nom=PartOfMedicamentName
        nom_part = self.request.query_params.get('nom')
        if nom_part is not None:
            # if nom contains 'nom_part' (case insensitive)
            queryset = queryset.filter(nom__icontains=nom_part)

        return queryset