from rest_framework.generics import ListAPIView
from rest_framework.permissions import *
from rest_framework.decorators import permission_classes
from ..permissions import *
from ..permissions.auth import *
from ..models import Employe
from ..serializers.employe import EmployeSerializer


class EmployeListView(ListAPIView):

    serializer_class = EmployeSerializer

    def get_queryset(self):
        queryset = Employe.objects.all()
        role = self.request.query_params.get('role')
        
        if role is not None:
            queryset = queryset.filter(role=role)
        
        return queryset
