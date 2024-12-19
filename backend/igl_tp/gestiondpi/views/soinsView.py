from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import *
from rest_framework.response import Response
from ..permissions import *
from ..permissions.soin import *
from ..permissions.auth import *
from rest_framework import status,permissions
from ..models import *
from ..serializers.soin import *
from django.shortcuts import get_object_or_404

class SoinView(APIView):
   # permission_classes = [IsAuthenticated,SoinPermissions]

    def get(self, request, soin_id):
        soin = get_object_or_404(Soin, pk=soin_id)
        serializer = SoinSerializer(soin)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SoinSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient_id=request.data['patient'], infirmier_id=request.data['infirmier'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, soin_id):
        soin = get_object_or_404(Soin, pk=soin_id)
        serializer = SoinSerializer(soin, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, soin_id):
        soin = get_object_or_404(Soin, pk=soin_id)
        soin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
#@permission_classes([IsAuthenticated,IsInfirmier])
def add_soin_medicament(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    serializer = SoinMedicamentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(soin=soin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
#@permission_classes([IsAuthenticated,IsInfirmier])
def add_observation_etat(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    serializer = ObservationEtatSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(soin=soin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
#@permission_classes([IsAuthenticated,IsInfirmier])
def add_soin_infermier(request, soin_id):
    soin = get_object_or_404(Soin, pk=soin_id)
    serializer = SoinInfirmierSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(soin=soin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


