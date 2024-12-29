from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from ..models import Ordonance, Patient
from ..serializers import OrdonnanceSerializer 
from ..permissions import IsMedecin



class OrdonnanceValidationAPIView(APIView):
    def post(self, request, ordonnance_id):
        if IsMedecin(request.user) and request.user.is_authenticated:
            try:
                ordonnance = Ordonance.objects.get(id=ordonnance_id)
            except Ordonance.DoesNotExist:
                return Response({"error": "Ordonnance not found"}, status=status.HTTP_404_NOT_FOUND)

            # Si seriousement on veut envoyer un mail, il faut avoir un email valide , je peux pas penser a un autre moyen de validation
            pharmacien_email = "pharmacien@example.com"  
            send_mail(
                'Ordonnance Validation Request',
                f'Please validate the following ordonnance: {ordonnance.id}',
                settings.DEFAULT_FROM_EMAIL,
                [pharmacien_email],
                fail_silently=False,
            )

            return Response({"message": "Validation request sent to pharmacien"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
 


class OrdonnanceCreateAPIView(APIView):
    def post(self, request, nss):
        if IsMedecin(request.user) and request.user.is_authenticated:
            try:
                patient = Patient.objects.get(nss=nss)
            except Patient.DoesNotExist:
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
            
            ordonnance_data = request.data
            ordonnance_data['patient'] = patient.id
            ordonnance_data['medecin'] = request.user.id

            serializer = OrdonnanceSerializer.OrdonnanceSerializer(data=ordonnance_data)
            if serializer.is_valid():
                ordonnance = serializer.save()

                medicaments_data = request.data.get('medicaments', [])
                for medicament_data in medicaments_data:
                    medicament_data['ordonnance'] = ordonnance.id
                    medicament_serializer = OrdonnanceSerializer.OrdonnanceMedicamentsSerializer(data=medicament_data)
                    if medicament_serializer.is_valid():
                        medicament_serializer.save()
                    else:
                        return Response(medicament_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)