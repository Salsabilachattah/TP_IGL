from rest_framework import permissions


class PatientViewPermissions(permissions.BasePermission):
    """
    Custom permission to allow:
    - GET requests for users in the 'medecin', 'laboratorien', or 'patient' groups.
    - POST requests only for users in the 'medecin' group.
    """

    def has_permission(self, request, view):
        # For GET method, allow access to anyyone with a valid account
        if request.method == 'GET':
            return not request.user.groups.filter(name='patient').exists()

        # For POST method, allow only 'medecin' and 'administratif'  group
        elif request.method == 'POST':
            return request.user.groups.filter(name__in=['medecin', 'administratif']).exists()

        # Default: deny any other methods (e.g., PUT, DELETE)
        return False