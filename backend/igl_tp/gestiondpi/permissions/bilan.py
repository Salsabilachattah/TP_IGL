from rest_framework import permissions

class BilanPermissions(permissions.BasePermission):
    """
    Custom permission to allow:
    - GET requests for users in the 'medecin', 'laboratorien', or 'patient' groups.
    - POST requests only for users in the 'medecin' group.
    """

    def has_permission(self, request, view):
        # For GET method, allow access to 'medecin', 'laboratorien', or 'patient' groups
        if request.method == 'GET':
            # Check if the user belongs to any of the allowed groups
            return request.user.groups.filter(name__in=['medecin', 'laboratorien', 'radiologue','patient']).exists()

        # For POST method, allow only 'medecin' group
        if request.method == 'POST':
            return request.user.groups.filter(name__in='medecin').exists()

        if request.method =='PATCH':
            return request.user.groups.filter(name__in= [ 'laboratorien', 'radiologue']).exists()

        # Default: deny any other methods (e.g., PUT, DELETE)
        return False

