from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import Employe
from ..serializers.bilan import EmployeInfoSerializer

class AddInfirmierView(APIView):
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['role'] = 'infirmier'

        serializer = EmployeInfoSerializer(data=data)
        if serializer.is_valid():
            employe = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
