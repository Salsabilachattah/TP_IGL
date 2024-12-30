from rest_framework import permissions


class ConsultationsPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['medecin', 'patient']).exists()

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return obj.patient.user == request.user or request.user.groups.filter(name='medecin').exists()
        elif request.method == 'PATCH':
            return obj.medecin.user == request.user
        return False

