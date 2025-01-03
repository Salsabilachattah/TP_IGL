from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from ..models import Soin
from ..permissions.auth import IsInfirmier
from ..permissions.soin import SoinPermissions
from django.shortcuts import get_object_or_404
from ..serializers.soin import *


class SoinView(APIView):
    permission_classes = [SoinPermissions]

    @swagger_auto_schema(
        tags=["soin"],
        operation_summary="Retrieve Soin by ID",
    )

    def get(self, request, soin_id):
        soin = get_object_or_404(Soin, pk=soin_id)
        serializer = SoinSerializer(soin)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema( 
        tags=["soin"],
        operation_summary="Update Soin by ID",
    )
    def put(self, request, soin_id):
        soin = get_object_or_404(Soin, pk=soin_id)
        serializer = SoinSerializer(soin, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema( 
    method="post", 
    tags=["soin"], 
    operation_summary="Create Soin"
)


@api_view(['POST'])
@permission_classes([IsInfirmier])
def create_soin(request):
    serializer = SoinSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(patient_id=request.data['patient'], infirmier_id=request.data['infirmier'])
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    tags=["soin"],
    operation_summary="Recherche Soin Par patient"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_soins_par_nss(request,nss):
    patient = get_object_or_404(Patient, nss=nss)
    serializer = SoinSerializer(patient=patient,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="post",
    tags=["soin"],
    operation_summary="Add Medicament to Soin",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'medicaments': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={ 'medicament': openapi.Schema(type=openapi.TYPE_INTEGER, description='Medicament id'),
                                 'dose': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament dose', example='500mg'),
                                 'quantity': openapi.Schema(type=openapi.TYPE_INTEGER, description='Medicament quantity', example=30),
                                 'duree': openapi.Schema(type=openapi.TYPE_INTEGER, description='Duree in days', example=7)
                               }
                ),
                description='List of medicaments in the ordonnance'
            )
        },
        required=['medicaments']
    )
)

@api_view(['POST'])
@permission_classes([IsInfirmier])
def add_soin_medicament(request, soin_id):
    print("Incoming payload:", request.data)  # Log received data
    print("Incoming soin_id:", soin_id)  # Log received data
    soin = get_object_or_404(Soin, pk=soin_id)
    serializer = SoinMedicamentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(soin=soin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)  # Log serializer errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method="post",
    tags=["soin"],
    operation_summary="Add Observation Etat to Soin",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'observation': openapi.Schema(type=openapi.TYPE_STRING, description='Observation')
        },
        required=['observation']
    ),
    responses={201: openapi.Response(
        description="Observation added to Soin successfully",
        schema=ObservationEtatSerializer()
    ), 
    400: openapi.Response( description="Invalid data provided",
    )}
)





@api_view(['POST'])
@permission_classes([IsInfirmier])
def add_observation_etat(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    serializer = ObservationEtatSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(soin=soin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method="post",
    tags=["soin"],
    operation_summary="Add Infirmier to Soin",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'infirmier': openapi.Schema(type=openapi.TYPE_INTEGER, description='Infirmier id')
        },
        required=['infirmier']
    ),
    responses={201: openapi.Response(
        description="Infirmier added to Soin successfully",
        schema=SoinInfirmierSerializer()
    ),
    400: openapi.Response(
        description="Invalid data provided",
    )}
)

@api_view(['POST'])
@permission_classes([IsInfirmier])
def add_soin_infermier(request, soin_id):
    print("Incoming payload:", request.data)  # Log received data
    soin = get_object_or_404(Soin, pk=soin_id)
    serializer = SoinInfirmierSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(soin=soin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)  # Log serializer errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
