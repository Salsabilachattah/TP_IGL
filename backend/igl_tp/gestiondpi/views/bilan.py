from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from setuptools.tests.test_bdist_egg import Test

from ..models import BilanBiologique, Consultation, BilanRadiologique, BilanBioTest, ImageRadio, Employe, Patient
from ..permissions.auth import IsRadiologue, IsLaboratorien
from ..serializers.bilan import BilanBioSerializer, BilanRadioSerializer, BilanBioEditSerializer, \
    BilanRadioEditSerializer, TestSerializer, BilanRadioCreateSerializer, BilanBioCreateSerializer, ImageRadioSerializer
from ..permissions.bilan import BilanPermissions
from rest_framework.response import Response
from rest_framework import status,permissions
from django.shortcuts import get_object_or_404



class BilanBiologiqueView(APIView):
    permission_classes = [IsAuthenticated,BilanPermissions]  # Only allow admins to create groups

    @swagger_auto_schema(
        tags=["bilan bio"],
        operation_summary = "Get bilan biologique",
    )
    def get(self, request, pk):
        bilan = get_object_or_404(BilanBiologique,pk=pk)
        tests = BilanBioTest.objects.filter(bilan_biologique=bilan)
        serializer = BilanBioSerializer(bilan,tests=tests)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        tags=["bilan bio"],
        operation_summary = "Create bilan biologique (par medecin)",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'description': openapi.Schema(
                    type=openapi.TYPE_STRING,
                ),
            },
            required=['description'],  # Indicate that 'description' is required
        )
    )
    def post(self, request, pk):
        # Fetch the Consultation instance using the pk from the URL
        consultation = get_object_or_404(Consultation, pk=pk)

        serializer = BilanBioCreateSerializer(consultation=consultation,patient=consultation.patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "BilanBiologique created successfully"},status=status.HTTP_201_CREATED)

        # Return a success message instead of the serialized data
        Response({"error": "Description is required."},status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        tags=["bilan bio"],
        operation_summary = "Edit resume et valide"
    )
    def patch(self ,request, pk):
        bilan_bio = get_object_or_404(BilanBiologique, pk=pk)
        if bilan_bio.laborantin.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = BilanBioEditSerializer(bilan_bio, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class BilanRadiologiqueView(APIView):
    permission_classes = [IsAuthenticated,BilanPermissions]  # Only allow admins to create groups

    @swagger_auto_schema(
        tags=["bilan radio"],
        operation_summary = "Get bilan radiologique",
    )
    def get(self, request, pk):
        bilan_radiologique = get_object_or_404(BilanBiologique,pk=pk)
        images= ImageRadio.objects.filter(bilan_radiologique=bilan_radiologique)
        serializer = BilanRadioSerializer(bilan_radiologique,images=images)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        tags=["bilan radio"],
        operation_summary = "Create bilan radiologique (par medecin)",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'description': openapi.Schema(
                    type=openapi.TYPE_STRING,
                ),
            },
            required=['description'],  # Indicate that 'description' is required
        )
    )
    def post(self, request, pk):

        # Fetch the Consultation instance using the pk from the URL
        consultation = get_object_or_404(Consultation, pk=pk)

        serializer = BilanRadioCreateSerializer(consultation=consultation, patient=consultation.patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "BilanRadiologique created successfully"}, status=status.HTTP_201_CREATED)

        # Return a success message instead of the serialized data
        Response({"error": "Description is required."}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        tags=["bilan radio"],
        operation_summary = "Edit compte-rendu et valide",
        request_body = BilanRadioEditSerializer
    )
    def patch(self ,request, pk):
        bilan_radio = get_object_or_404(BilanRadiologique, pk=pk)
        if bilan_radio.radiologue.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = BilanRadioEditSerializer(bilan_radio, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@swagger_auto_schema(
    method='post',
    tags=["bilan radio"],
    operation_summary="Add an image to a bilan radiologique",
    manual_parameters=[
        openapi.Parameter(
            'image',
            openapi.IN_FORM,  # Form data
            type=openapi.TYPE_FILE,  # File upload type
            description='Image file to upload (must be a valid image format).'
        ),
    ],
    responses={
        201: openapi.Response(
            description="Image added successfully",
            examples={
                "application/json": {
                    "message": "Image added successfully",
                    "image_url": "/media/path/to/image.jpg"
                }
            }
        ),
        400: openapi.Response(description="No image provided or invalid request."),
        403: openapi.Response(description="User not authorized."),
        404: openapi.Response(description="BilanRadiologique not found."),
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRadiologue])
@parser_classes([MultiPartParser, FormParser])
def add_bilanradio_image(request, pk):
    bilan_radiologique = get_object_or_404(BilanRadiologique, pk=pk)

    if bilan_radiologique.radiologue.user != request.user:
        return Response(
            {"detail": "You are not authorized to add a radio to this bilan."},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer=ImageRadioSerializer(bilan_radiologique=bilan_radiologique,data=request.data, partial=True)

    if serializer.is_valid():
        image_instance=serializer.save()
        return Response({
            'message': 'Image added successfully',
            'image_url': image_instance.image.url
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(
    method='post',
    tags=["bilan bio"],
    operation_summary = "Add bilan bio test",
    request_body=TestSerializer
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsLaboratorien])  # Add the IsAuthenticated permission
def add_bilanbio_test(request, pk):
    # Get the BilanBiologique instance for the given consultation (consultation id is pk)
    bilan_biologique = get_object_or_404(BilanBiologique, pk=pk)

    if bilan_biologique.laborantin.user != request.user:
        return Response(
            {"detail": "You are not authorized to add a test to this bilan."},
            status=status.HTTP_403_FORBIDDEN
        )

    # Add 'bilan_biologique' to request.data
    data = request.data.copy()
    data['bilan_biologique'] = pk

    # Create the BilanBioTest instance
    serializer = TestSerializer(data=data)
    if serializer.is_valid():
        serializer.save()

        # Return the created test as a response
        return Response({
            'message': "Test added successfully",
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    # Handle invalid serializer
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@swagger_auto_schema(
    method='get',
    tags=["bilan bio"],
    operation_summary = "Get last two bilans bio"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_last_two_bilans(request, nss):
    # Get the last two BilanBiologique for the given patient
    bilans = BilanBiologique.objects.filter(nss=nss).order_by('-date_debut')[:2]

    if not bilans:
        return Response({'detail': 'No BilanBiologique found for this patient.'}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the data
    serializer = BilanBioSerializer(bilans, many=True)

    return Response({'bilans': serializer.data}, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    tags=["bilan bio"],
    operation_summary = "Get all bilans for patient, can search by nss and valide"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recherche_bilan_bio(request):
    bilans = BilanBiologique.objects.all()

    nss = request.query_params.get('nss', None)
    if nss is not None:
        patient = get_object_or_404(Patient, nss=nss)
        bilans=bilans.filter(patient=patient)

    valide_param = request.query_params.get('valide', None)
    if valide_param is not None:
        if valide_param.lower() in ['true', 'false']:
            valide = valide_param.lower() == 'true'
            bilans = bilans.filter(valide=valide)
        else:
            return Response({'detail': "'valide' must be a boolean value ('true' or 'false')."},
                            status=status.HTTP_400_BAD_REQUEST)

    serializer = BilanBioSerializer(bilans, many=True)

    return Response({'bilans': serializer.data}, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    tags=["bilan radio"],
    operation_summary = "Get all bilans for patient, can search by nss and valide"
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recherche_bilan_radio(request):
    bilans = BilanRadiologique.objects.all()
    nss = request.query_params.get('nss', None)
    if nss is not None:
        patient = get_object_or_404(Patient, nss=nss)
        bilans=bilans.filter(patient=patient)

    valide_param = request.query_params.get('valide', None)
    if valide_param is not None:
        if valide_param.lower() in ['true', 'false']:
            valide = valide_param.lower() == 'true'
            bilans = bilans.filter(valide=valide)
        else:
            return Response({'detail': "'valide' must be a boolean value ('true' or 'false')."},
                            status=status.HTTP_400_BAD_REQUEST)

    serializer = BilanRadioSerializer(bilans, many=True)

    return Response({'bilans': serializer.data}, status=status.HTTP_200_OK)




@swagger_auto_schema(
    method='post',
    tags=["bilan bio"],
    operation_summary = "Take bilan bio"
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsLaboratorien])  # Only authenticated laboratorien can access this
def take_bilan_bio(request, pk):
    # Get the 'Employe' instance for the authenticated user, or return 404 if not found
    employe = get_object_or_404(Employe, user=request.user)

    # Get the corresponding 'BilanBiologique' instance, or return 404 if not found
    bilan_bio = get_object_or_404(BilanBiologique, consultation__pk=pk)

    # Set the laboratorien (laborantin) to the 'Employe' instance
    bilan_bio.laborantin = employe
    bilan_bio.save()

    return Response({"detail": "Bilan biologique updated successfully."}, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method='post',
    tags=["bilan radio"],
    operation_summary = "Take bilan radio",
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRadiologue])  # Only authenticated laboratorien can access this
def take_bilan_radio(request, pk):
    # Get the 'Employe' instance for the authenticated user, or return 404 if not found
    employe = get_object_or_404(Employe, user=request.user)

    # Get the corresponding 'BilanRadiologique' instance, or return 404 if not found
    bilan_radio = get_object_or_404(BilanRadiologique, consultation__pk=pk)

    # Set the laboratorien (radiologue) to the 'Employe' instance
    bilan_radio.radiologue = employe
    bilan_radio.save()

    return Response({"detail": "Bilan radiologique updated successfully."}, status=status.HTTP_200_OK)
