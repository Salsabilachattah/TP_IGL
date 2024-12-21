from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Consultation
from ..permissions.auth import IsMedecin
from ..permissions.consultation import ConsultationsPermissions
from ..serializers.consultation import ResumeSerializer, DiagnostiqueSerializer, ConsultationSerializer, CreerConsultationSerializer
from django.shortcuts import get_object_or_404


class ConsultationView(APIView):
    permission_classes = [IsAuthenticated,ConsultationsPermissions]
    def get_object(self) -> Consultation:
        return Consultation.objects.get(pk=self.kwargs['pk'])

    def get(self, request, pk):
        consultation=self.get_object()
        self.check_object_permissions(self.request,consultation)
        serializer = ConsultationSerializer(consultation)
        return Response({"consultation": serializer.data}, status=status.HTTP_200_OK)

    # create consultation
    def post(self, request):
        serializer = CreerConsultationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the valid data to the database
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsMedecin])
def change_resume(self, request, pk):
    consultation = get_object_or_404(Consultation, pk=pk)
    if consultation.medecin.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = ResumeSerializer(consultation, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsMedecin])
def change_diagnostique(self, request, pk):
    consultation = get_object_or_404(Consultation, pk=pk)
    if consultation.medecin.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = DiagnostiqueSerializer(consultation, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)