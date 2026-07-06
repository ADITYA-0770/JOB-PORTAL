from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Application
from .serializers import ApplyJobSerializer, ApplicationListSerializer, ApplicationStatusSerializer, ApplicationStatusViewSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ApplyJob(request):
    serializer = ApplyJobSerializer(data = request.data, context = {'request' : request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ApplicationList(request):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can view applications'}, status=status.HTTP_403_FORBIDDEN)
    recruiter = user.recruiterprofile
    job_ids = recruiter.jobs.values('id', flat=True)
    applications = Application.objects.filter(job__recruiter = recruiter).select_related('applicant__user', 'job', 'applicant')
    serializer = ApplicationListSerializer(applications, many=True)
    return Response(serializer.data)
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def UpdateApplicationStatus(request, application_id):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can update application status'}, status=status.HTTP_403_FORBIDDEN)
    application = get_object_or_404(Application, id=application_id)
    if application.job.recruiter != user.recruiterprofile:
        return Response({'error': 'You are not authorized to update this application'}, status=status.HTTP_403_FORBIDDEN)
    serializer = ApplicationStatusSerializer(application, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewApplicationStatus(request):
    user = request.user
    if user.role != 'candidate':
        return Response({'error': 'Only candidates can view application status'}, status=status.HTTP_403_FORBIDDEN)
    applications = Application.objects.filter(applicant__user=user).select_related('job', 'applicant__user', 'applicant')
    serializer = ApplicationStatusViewSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
