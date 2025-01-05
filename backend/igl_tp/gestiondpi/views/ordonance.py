from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from qrcode import *
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Ordonance, Patient, Employe, Consultation
from ..permissions.auth import IsMedecin, IsPharmacien
from django.core.mail import send_mail
from django.conf import settings

from ..serializers.ordonance import OrdonnanceSerializer, OrdonnanceMedicamentsSerializer, OrdonnanceCreateSerializer


@swagger_auto_schema(
    method="get",
    tags=["sgbh"],
    operation_summary="Get all non validated ordonances",
    responses={
        status.HTTP_200_OK: OrdonnanceSerializer
    }
)
@api_view(["GET"])
@permission_classes([IsAuthenticated,IsPharmacien])
def get_all_non_validated_ordonances(self, request): # Get all non-validated ordonnances
    ordonnances = Ordonance.objects.filter(valide=False)
    serializer = OrdonnanceSerializer(ordonnances, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method="post",
    tags=["sgbh"],
    operation_summary="Validate ordonance",
)
@api_view(["POST"])
@permission_classes([IsAuthenticated,IsPharmacien])
def validate_ordonance(self, request, pk): # pk is the id of the ordonnance to validate
    ordonnance = get_object_or_404(Ordonance, pk=pk)
    ordonnance.valide = True # Validate it
    ordonnance.save()
    return Response({'status': 'ordonnance validated'}, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method="post",
    tags=["ordonance"]
)
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsMedecin])
def envoyer_ordonance_email(self, request, ordonnance_id):
    ordonnance =get_object_or_404(Ordonance,id=ordonnance_id)

    # Send email to pharmacien for validation
    pharmacien_email = "pharmacien@example.com"
    send_mail(
        'Ordonnance Validation Request',
        f'Please validate the following ordonnance: {ordonnance.id}',
        settings.DEFAULT_FROM_EMAIL,
        [pharmacien_email],
        fail_silently=False,
    )

    return Response({"message": "Validation request sent to pharmacien"}, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method="post",
    tags=["ordonance"],
    operation_summary="Create an ordonnance (prescription) for a patient",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'medicaments': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'medicament': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament nom'),
                        'dose': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament dose', example='500mg'),
                        'duree': openapi.Schema(type=openapi.TYPE_INTEGER, description='Duree in days',example=7)
                    }
                ),
                description='List of medicaments in the ordonnance'
            )
        },
        required=['date', 'medicaments']
    ),
    responses={
        201: openapi.Response(
            description="Ordonnance created successfully",
            schema=OrdonnanceSerializer
        ),
        400: openapi.Response(
            description="Invalid data provided",
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsMedecin])
def creer_ordonance(request, pk):
    medecin = get_object_or_404(Employe, user=request.user)
    consultation=get_object_or_404(Consultation, pk=pk)
    data = {"medecin": medecin.id, "patient": consultation.patient.nss}
    serializer = OrdonnanceCreateSerializer(data=data)
    if serializer.is_valid():
        ordonnance = serializer.save()
        consultation.ordonance=ordonnance
        consultation.save()
        medicaments_data = request.data
        for medicament in medicaments_data:
            medicament["ordonance"] = ordonnance.id
            medicament["dose"] = medicament["doses"]
            medicament["doses"] = None
            print(medicament)

            #return Response({'status': serializer.data}, status=status.HTTP_201_CREATED)
            medicament_serializer = OrdonnanceMedicamentsSerializer(data=medicament)
            if medicament_serializer.is_valid():
                medicament_serializer.save()

            else:
                return Response(medicament_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method="get",
    tags=["ordonance"],
    operation_summary="Get all ordonances for a patient",
    responses={
        status.HTTP_200_OK: OrdonnanceSerializer
    }
)
@api_view(["GET"])
@permission_classes([IsAuthenticated,IsPharmacien])
def get_ordonances_by_nss( request,nss): # Get all non-validated ordonnances
    ordonnances = Ordonance.objects.filter(patient__nss=nss)
    serializer = OrdonnanceSerializer(ordonnances, many=True)
    return Response(serializer.data)