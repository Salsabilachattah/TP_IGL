from rest_framework.permissions import BasePermission

class IsMedecin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='medecin').exists()


class IsAdministratif(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='administratif').exists()

class IsInfirmier(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='infirmier').exists()

class IsRadiologue(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='radiologue').exists()



class IsPharmacien(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='pharmacien').exists()

class IsLaboratorien(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='laboratorien').exists()

class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='patient').exists()