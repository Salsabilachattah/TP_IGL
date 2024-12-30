from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Consultation, Patient, Employe
from ..permissions.auth import IsMedecin
from ..permissions.consultation import ConsultationsPermissions
from ..serializers.consultation import ConsultationSerializer, \
    ConsultationEditSerializer
from django.shortcuts import get_object_or_404


# Class for handling GET requests to retrieve consultations
class ConsultationDetailView(APIView):
    permission_classes = [IsAuthenticated,ConsultationsPermissions]
    @swagger_auto_schema(
        tags=["consultation"],
        operation_summary = "Get consultation by id",
    )
    def get(self, request, pk):
        consultation = get_object_or_404(Consultation, pk=pk)
        self.check_object_permissions(self.request, consultation)

        serializer = ConsultationSerializer(consultation)
        return Response({"consultation": serializer.data}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        tags=["consultation"],
        operation_summary = "Modifier diagnostique et resumé",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'diagnostique' : openapi.Schema(
                    type=openapi.TYPE_STRING,
                ),
                'resume' : openapi.Schema(
                    type=openapi.TYPE_STRING,
                ),
            },
            required=[],  # Indicate that 'description' is required
        )
    )
    def patch(self,request, pk):
        consultation = get_object_or_404(Consultation, pk=pk)
        self.check_object_permissions(self.request, consultation)

        serializer = ConsultationEditSerializer(consultation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method="post",
    tags=["consultation"],
    operation_summary = "Create consultation",
)
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsMedecin])  # Add the IsAuthenticated permission
def create_consultation(self, request, nss):
    # Fetch the patient based on the NSS
    patient = get_object_or_404(Patient, nss=nss)

    # Get the logged-in user and their associated employee record (medecin)
    medecin = get_object_or_404(Employe, user=request.user)

    # Create the consultation object
    consultation = Consultation(patient=patient, medecin=medecin)
    serializer = ConsultationSerializer(instance=consultation, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



