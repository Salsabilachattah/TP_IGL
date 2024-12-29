from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from ..models import BilanBiologique, Consultation, BilanRadiologique, BilanBioTest, ImageRadio, Employe
from ..permissions.auth import IsRadiologue, IsLaboratorien
from ..serializers.bilan import BilanBioSerializer, BilanRadioSerializer, BilanBioEditSerializer, \
    BilanRadioEditSerializer, TestSerializer
from ..permissions.bilan import BilanPermissions
from rest_framework.response import Response
from rest_framework import status,permissions
from django.shortcuts import get_object_or_404



class BilanBiologiqueView(APIView):
    permission_classes = [IsAuthenticated,BilanPermissions]  # Only allow admins to create groups

    @swagger_auto_schema(
        tags=["bilans"]
    )
    def get(self, request, consultation_id):
        bilan = get_object_or_404(BilanBiologique,pk=consultation_id)
        serializer = BilanBioSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        tags=["bilans"]
    )
    def post(self, request, consultation_id):
        # Extract 'description' from request data
        description = request.data.get("description")

        # Validate that the description is provided
        if not description:
            return Response(
                {"error": "Description is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch the Consultation instance using the consultation_id from the URL
        consultation = get_object_or_404(Consultation, pk=consultation_id)

        # Create the BilanBiologique object
        bilan = BilanBiologique.objects.create(
            consultation=consultation,
            patient=consultation.patient,  # Automatically link the patient from the consultation
            description=description
        )

        # Return a success message instead of the serialized data
        return Response({"message": "BilanBiologique created successfully"},status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        tags=["bilans"]
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
        tags=["bilans"]
    )
    def get(self, request, consultation_id):
        bilan = get_object_or_404(BilanBiologique,pk=consultation_id)
        serializer = BilanRadioSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
tags=["bilans"]
    )
    def post(self, request, consultation_id):
        # Extract 'description' from request data
        description = request.data.get("description")

        # Validate that the description is provided
        if not description:
            return Response(
                {"error": "Description is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch the Consultation instance using the consultation_id from the URL
        consultation = get_object_or_404(Consultation, pk=consultation_id)

        # Create the BilanBiologique object
        bilan = BilanRadiologique.objects.create(
            consultation=consultation,
            patient=consultation.patient,  # Automatically link the patient from the consultation
            description=description
        )

        # Return a success message instead of the serialized data
        return Response({"message": "BilanRadiologique created successfully"},status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        tags=["bilans"]
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
    tags=["bilans"]
)
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsRadiologue])  # Add the IsAuthenticated permission
def add_bilanradio_image(request, pk):
    # Get the BilanRadiologique instance for the given consultation (consultation id is pk)
    bilan_radiologique = get_object_or_404(BilanRadiologique, pk=pk)

    if bilan_radiologique.radiologue.user != request.user:
        return Response(
            {"detail": "You are not authorized to add a radio to this bilan."},
            status=status.HTTP_403_FORBIDDEN
        )

    # Check if an image is provided in the request
    image = request.FILES.get('image')
    if not image:
        return Response({'detail': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the ImageRadio instance and associate it with the BilanRadiologique instance
    image_instance = ImageRadio.objects.create(
        image=image,
        bilan_radiologique=bilan_radiologique
    )

    # Get the URL of the uploaded image
    image_url = image_instance.image.url  # This will give you the relative URL to the media root

    # Return the image URL in the response
    return Response({
        'message': 'Image added successfully',
        'image_url': image_url
    }, status=status.HTTP_201_CREATED)



@swagger_auto_schema(
    method='post',
    tags=["bilans"]
)
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsLaboratorien])  # Add the IsAuthenticated permission
def add_bilanbio_test(request, pk):

    # Get the BilanBiologique instance for the given consultation (consultation id is pk)
    bilan_biologique = get_object_or_404(BilanBiologique, pk=pk)

    if bilan_biologique.laborantin.user != request.user:
        return Response(
            {"detail": "You are not authorized to add a test to this bilan."},
            status=status.HTTP_403_FORBIDDEN
        )

    # Create the BilanBioTest instance
    test = TestSerializer(bilan_biologique=bilan_biologique,data=request.data)

    # Return the created test as a response
    return Response({
        'message':"Test added successfully",
    }, status=status.HTTP_201_CREATED)


@swagger_auto_schema(
    method='get',
    tags=["bilans"]
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
    method='post',
    tags=["bilans"]
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
    tags=["bilans"]
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