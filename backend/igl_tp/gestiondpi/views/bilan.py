from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from ..models import BilanBiologique, Consultation, BilanRadiologique, BilanBioTest, ImageRadio
from ..permissions.auth import IsRadiologue, IsLaboratorien
from ..serializers.bilan import BilanBioSerializer, BilanRadioSerializer
from ..permissions.bilan import BilanPermissions
from rest_framework.response import Response
from rest_framework import status,permissions
from django.shortcuts import get_object_or_404




class BilanBiologiqueView(APIView):
    permission_classes = [IsAuthenticated,BilanPermissions]  # Only allow admins to create groups

    def get(self, request, consultation_id):
        bilan = get_object_or_404(BilanBiologique,pk=consultation_id)
        serializer = BilanBioSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)

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




class BilaRadiologiqueView(APIView):
    permission_classes = [IsAuthenticated,BilanPermissions]  # Only allow admins to create groups

    def get(self, request, consultation_id):
        bilan = get_object_or_404(BilanBiologique,pk=consultation_id)
        serializer = BilanRadioSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)

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


@api_view(['POST'])
@permission_classes([IsAuthenticated,IsLaboratorien])  # Add the IsAuthenticated permission
def add_bilanbio_test(request, pk):

    # Get the BilanBiologique instance for the given consultation (consultation id is pk)
    bilan_biologique = get_object_or_404(BilanBiologique, pk=pk)

    # Extract the data for the new test
    test_type = request.data.get('type')
    test_valeur = request.data.get('valeur')

    if test_type is None or test_valeur is None:
        return Response({'detail': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the BilanBioTest instance directly
    test = BilanBioTest.objects.create(
        type=test_type,
        valeur=test_valeur,
        bilan_biologique=bilan_biologique
    )

    # Return the created test as a response
    return Response({
        'message':"Test added successfully",
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated,IsRadiologue])  # Add the IsAuthenticated permission
def add_bilanradio_image(request, pk):
    # Get the BilanRadiologique instance for the given consultation (consultation id is pk)
    bilan_radiologique = get_object_or_404(BilanRadiologique, pk=pk)

    # Check if an image is provided in the request
    if 'image' not in request.FILES:
        return Response({'detail': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)

    # Get the image from the request
    image = request.FILES['image']

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