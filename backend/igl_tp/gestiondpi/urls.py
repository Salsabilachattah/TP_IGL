# urls.py
from django.urls import path
from .views import CreateRolesGroupsView

urlpatterns = [
    path('create-roles-groups/', CreateRolesGroupsView.as_view(), name='create_roles_groups'),
]
