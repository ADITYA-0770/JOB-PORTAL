from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User, CandidateProfile, RecruiterProfile
from .serializers import RecruiterRegistrationSerializer, UserSerializer, CandidateProfileSerializer, RecruiterProfileSerializer, CandidateRegistrationSerializer, CandidateProfileUpdateSerializer, RecruiterProfileUpdateSerializer
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


@api_view(['GET'])
def UserList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def CandidateRegistration(request):
    serializer = CandidateRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def RecruiterRegistration(request):
    serializer = RecruiterRegistrationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def Login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(email=email, password = password)

    if user is None:
        return Response(
            {'error': 'Invalid email or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "email": user.email,
        "role": user.role
    })
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Profile(request):

    return Response({'message': 'Profile Accessed'});   

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def UpdateCandidateProfile(request):
    user = request.user
    if user.role != 'candidate':
        return Response({'error': 'Only candidates can update their profile'}, status=status.HTTP_403_FORBIDDEN)
    candidate_profile = get_object_or_404(CandidateProfile, user=user)
    serializer = CandidateProfileUpdateSerializer(candidate_profile, data=request.data, partial=True) 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def UpdateRecruiterProfile(request):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can update their profile'}, status=status.HTTP_403_FORBIDDEN)
    recruiter_profile = get_object_or_404(RecruiterProfile, user=user)
    serializer = RecruiterProfileUpdateSerializer(recruiter_profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)