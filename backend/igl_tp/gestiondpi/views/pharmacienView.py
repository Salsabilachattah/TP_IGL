from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from ..models import Ordonance
from ..serializers import OrdonnanceSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..permissions import IsPharmacien


class PharmacienView(APIView):
 def get(self, request): # Get all non-validated ordonnances
    if request.user.is_authenticated and IsPharmacien(request.user):
        ordonnances = Ordonance.objects.filter(valide=False)
        serializer = OrdonnanceSerializer(ordonnances, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)


 def post(self, request, pk): # pk is the id of the ordonnance to validate
     if request.user.is_authenticated and IsPharmacien(request.user):
        ordonnance = get_object_or_404(Ordonance, pk=pk)
        ordonnance.valide = True # Validate it
        ordonnance.save()
        return Response({'status': 'ordonnance validated'}, status=status.HTTP_200_OK)
     else: 
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
