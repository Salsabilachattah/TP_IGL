from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from qrcode import *
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Ordonance, Patient, Employe
from ..permissions.auth import IsMedecin, IsPharmacien
from django.core.mail import send_mail
from django.conf import settings

from ..serializers.ordonance import OrdonnanceSerializer, OrdonnanceMedicamentsSerializer


class SGPHView(APIView):
    permission_classes = [IsAuthenticated,IsPharmacien]

    @swagger_auto_schema(
        tags=["sgbh"]
    )
    def get(self, request): # Get all non-validated ordonnances
        ordonnances = Ordonance.objects.filter(valide=False)
        serializer = OrdonnanceSerializer(ordonnances, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        tags=["sgbh"]
    )
    def post(self, request, pk): # pk is the id of the ordonnance to validate
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
    tags=["ordonance"]
)
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsMedecin])
def creer_ordonance(self, request, nss):
    patient = get_object_or_404(Patient, nss=nss)
    medecin = get_object_or_404(Employe, user=request.user)

    serializer = OrdonnanceSerializer(partial=patient,medecin=medecin,data=request.data)
    if serializer.is_valid():
        serializer.save()
        if serializer.is_valid():
            ordonnance = serializer.save()

            medicaments_data = request.data.get('medicaments', [])
            for medicament_data in medicaments_data:
                medicament_serializer = OrdonnanceMedicamentsSerializer(ordonnance=ordonnance,data=medicament_data)
                if medicament_serializer.is_valid():
                    medicament_serializer.save()
                else:
                    return Response(medicament_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

