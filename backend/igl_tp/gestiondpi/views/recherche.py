from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView
from rest_framework.permissions import *
from rest_framework.decorators import permission_classes
from ..permissions import *
from ..permissions.auth import *
from ..models import Employe, Medicament
from ..serializers.commun import EmployeSerializer,MedicamentSerializer

@swagger_auto_schema(
    operation_summary="Retrieve a list of employe",
    operation_description="Retrieve a list of employe",
    manual_parameters=[
        openapi.Parameter(
            name='role',
            in_=openapi.IN_QUERY,
            description="Role of the Employe.",
            type=openapi.TYPE_STRING,
            required=True,
            example="aspirin"
        ),
        openapi.Parameter(
            name='nom',
            in_=openapi.IN_QUERY,
            description="Partial name of the medicament to filter (case insensitive).",
            type=openapi.TYPE_STRING,
            required=False,
            example="aspirin"
        )
    ],
    responses={
        200: MedicamentSerializer(many=True),
        400: "Bad Request - Invalid Query Parameter",
    },
    tags=['recherche']
)
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

@swagger_auto_schema(
    operation_summary="Retrieve a list of medicaments",
    operation_description="Retrieve a list of medicaments, optionally filtered by a partial match on the name (case insensitive).",
    manual_parameters=[
        openapi.Parameter(
            name='nom',
            in_=openapi.IN_QUERY,
            description="Partial name of the medicament to filter (case insensitive).",
            type=openapi.TYPE_STRING,
            required=False,
            example="aspirin"
        )
    ],
    responses={
        200: MedicamentSerializer(many=True),
        400: "Bad Request - Invalid Query Parameter",
    },
    tags=['recherche']
)
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