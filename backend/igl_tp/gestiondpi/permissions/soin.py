from rest_framework import permissions

class SoinPermissions(permissions.BasePermission):
    """
    Custom permission to allow:
    - GET requests for users in the 'infermier', or 'patient' groups.
    - POST requests only for users in the 'infermier' group.
    """

    def has_permission(self, request, view):
        # For GET method, allow access to 'infermier' or 'patient' groups
        if request.method == 'GET':
            # Check if the user belongs to any of the allowed groups
            return request.user.groups.filter(name__in=['infermier','patient']).exists()

        # For POST method, allow only 'infermier' group
        elif request.method in ['PUT', 'DELETE']:
            return request.user.groups.filter(name='infermier').exists()

        # Default: deny any other methods (e.g., PUT, DELETE)
        return False