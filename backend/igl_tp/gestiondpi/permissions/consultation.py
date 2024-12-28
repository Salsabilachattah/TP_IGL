from rest_framework import permissions


class ConsultationsPermissions(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.method == 'GET':
            return request.user.groups.filter(name__in=['medecin', 'patient']).exists()
        elif request.method == 'POST':
            return request.user.groups.filter(name='medecin').exists()

        # Default: deny any other methods (e.g., PUT, DELETE)
        return False


    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            if request.user.groups.filter(name='medecin').exists():
                return True
            elif request.user.groups.filter(name='patient').exists():
                return obj.patient.user == request.user

        elif request.method == 'POST':
            return request.user.groups.filter(name='medecin').exists()

        return False