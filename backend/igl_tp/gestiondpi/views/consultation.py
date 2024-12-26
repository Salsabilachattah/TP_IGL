from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Consultation
from ..serializers.consultation import ResumeSerializer,DiagnostiqueSerializer
from django.shortcuts import get_object_or_404

class ResumeView(APIView):
    def get(self, request, id):
        # Get the consultation instance by id
        consultation = get_object_or_404(Consultation, id=id)

        # Return the resume field as part of the response
        return Response({"resume": consultation.resume}, status=status.HTTP_200_OK)

    def patch(self, request, id):
        consultation = get_object_or_404(Consultation, id=id)
        serializer = ResumeSerializer(consultation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DiagnostiqueView(APIView):
    def get(self, request, pk):
        # Get the consultation instance by primary key
        consultation = get_object_or_404(Consultation, pk=pk)

        # Return the resume field as part of the response
        return Response({"resume": consultation.diagnostique}, status=status.HTTP_200_OK)


    def patch(self, request, pk):
        consultation = get_object_or_404(Consultation, pk=pk)
        serializer = DiagnostiqueSerializer(consultation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
