from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import Group
from rest_framework import status


class CreateRolesGroupsView(APIView):
    permission_classes = []  # Only allow admins to create groups

    def get(self, request):
        roles = ['medecin', 'administratif', 'infirmier', 'pharmacien','radiologue', 'laboratorien', 'patient']
        created_groups = []

        for role in roles:
            # Check if the group already exists, if not, create it
            group, created = Group.objects.get_or_create(name=role)
            if created:
                created_groups.append(group.name)

        return Response({"created_groups": created_groups}, status=status.HTTP_201_CREATED)