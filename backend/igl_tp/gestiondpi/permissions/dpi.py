from rest_framework import permissions

class PatientViewPermissions(permissions.BasePermission):
    """
    Custom permission to allow:
    - GET requests for any employe.
    - POST requests only for users in the 'medecin' or 'administratif' groups.
    """

    def has_permission(self, request, view):
        # For GET method, allow access to anyone with a valid account (except patient group)
        if not request.user.is_authenticated or request.user.groups.filter(name='patient').exists():
            return False
        
        if request.method == 'GET':
            return True
        
        # For POST method, allow only 'medecin' or 'administratif' group
        elif request.method == 'POST':
            return request.user.groups.filter(name__in=['medecin', 'administratif']).exists()

        # Default: deny any other methods (e.g., PUT, DELETE)
        return False
