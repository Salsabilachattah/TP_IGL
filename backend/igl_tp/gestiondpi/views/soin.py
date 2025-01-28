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
        soin = serializer.save(patient_id=request.data['patient'], infirmier_id=request.data['infirmier'])
        response_data = SoinSerializer(soin).data
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    tags=["soin"],
    operation_summary="Recherche Soin Par patient"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_soins_par_nss(request, nss):
    data = {'patient':nss}
    serializer = SoinSerializer(data=data)
    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=404)



@swagger_auto_schema(
    method="post",
    tags=["soin"],
    operation_summary="Add Medicament to Soin",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'infirmier': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Infirmier id'
            ),
            'medicaments': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={'medicament': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament name'),
                                'dose': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament dose',
                                                       example='50.0'),
                                'date_time': openapi.Schema( type=openapi.TYPE_STRING,format=openapi.FORMAT_DATETIME, description='Date and time')
                                }
                ),
                description='List of medicaments in the ordonnance'
            )
        },
        required=['infirmier', 'medicaments']
    )
)
@api_view(['POST'])  # changed (a lot changed in this file)
@permission_classes([IsInfirmier])
def add_soin_medicament(request, soin_id):
    infirmier=get_object_or_404( Employe,user=request.user)
    medicament_data = request.data
    medicament_data['soin'] = soin_id  # Assign the soin_id to each medication
    medicament_data['infirmier'] = infirmier.id  # Assign the same infirmier to each medication
    print(medicament_data)
    serializer = SoinMedicamentSerializer(data=medicament_data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(
    method="get",
    tags=["soin"],
    operation_summary="Get Medicaments of a Specific Soin",
    responses={
        200: openapi.Response(
            description="List of medicaments for the specified soin",
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'soin': openapi.Schema(type=openapi.TYPE_INTEGER, description='Soin id'),
                        'infirmier': openapi.Schema(type=openapi.TYPE_INTEGER, description='Infirmier id'),
                        'medicament': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament name'),
                        'dose': openapi.Schema(type=openapi.TYPE_STRING, description='Medicament dose', example=50.0),
                        'date_time': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                    description='Date and time', example='2025-01-05T12:00:00Z')
                    }
                )
            )
        )
    }
)
@api_view(['GET'])
@permission_classes([IsInfirmier])
def get_soin_medicaments(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    soin_medicaments = SoinMedicament.objects.filter(soin=soin)
    serializer = SoinMedicamentSerializer(soin_medicaments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
        400: openapi.Response(description="Invalid data provided",
                              )}
)
@api_view(['POST'])
@permission_classes([IsInfirmier])
def add_observation_etat(request, soin_id):
    infirmier=get_object_or_404( Employe,user=request.user)
    observation_data = request.data
    observation_data['soin'] = soin_id  # Assign the soin_id to each medication
    observation_data['infirmier'] = infirmier.id  # Assign the same infirmier to each medication
    serializer = ObservationEtatSerializer(data=observation_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    tags=["soin"],
    operation_summary="Get Observations of a Specific Soin",
    responses={
        200: openapi.Response(
            description="List of observations for the specified soin",
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'soin': openapi.Schema(type=openapi.TYPE_INTEGER, description='Soin id'),
                        'infirmier': openapi.Schema(type=openapi.TYPE_INTEGER, description='Infirmier id'),
                        'observation': openapi.Schema(type=openapi.TYPE_STRING, description='Observation'),
                        'date_time': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                    description='Date and time', example='2025-01-05T12:00:00Z')
                    }
                )
            )
        )
    }
)
@api_view(['GET'])
@permission_classes([IsInfirmier])
def get_observation_etats(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    observations = ObservationEtat.objects.filter(soin=soin)
    serializer = ObservationEtatSerializer(observations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="post",
    tags=["soin"],
    operation_summary="Add SoinInfirmier to Soin",
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
    infirmier=get_object_or_404( Employe,user=request.user)
    soin_data = request.data
    soin_data['soin'] = soin_id  # Assign the soin_id to each medication
    soin_data['infirmier'] = infirmier.id  # Assign the same infirmier to each medication
    serializer = SoinInfirmierSerializer(data=soin_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    tags=["soin"],
    operation_summary="Get SoinInfirmiers of a Specific Soin",
    responses={
        200: openapi.Response(
            description="List of infirmiers for the specified soin",
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'soin': openapi.Schema(type=openapi.TYPE_INTEGER, description='Soin id'),
                        'infirmier': openapi.Schema(type=openapi.TYPE_INTEGER, description='Infirmier id'),
                        'description': openapi.Schema(type=openapi.TYPE_STRING, description='Description'),
                        'date_time': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                    description='Date and time', example='2025-01-05T12:00:00Z')
                    }
                )
            )
        )
    }
)
@api_view(['GET'])
@permission_classes([IsInfirmier])
def get_soin_infirmiers(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    infirmiers = SoinInfirmier.objects.filter(soin=soin)
    serializer = SoinInfirmierSerializer(infirmiers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
