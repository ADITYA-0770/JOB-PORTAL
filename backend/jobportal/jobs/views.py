from jobs.pagination import JobPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import JobSerializer, CreateJobSerializer
from .models import Job
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q


@api_view(['GET'])
def JobList(request):
    jobs = Job.objects.filter(is_open=True).order_by('-created_at')
    pagination = JobPagination()
    search = request.query_params.get('search')
    location = request.query_params.get('location')
    job_type = request.query_params.get('job_type')
    if search:
        jobs = jobs.filter(Q(title__icontains=search) | Q(description__icontains=search) | Q(location__icontains=search))
    if location:
        jobs = jobs.filter(location__icontains=location)
    if job_type:
        jobs = jobs.filter(job_type=job_type)
    page = pagination.paginate_queryset(jobs, request)
    serializer = JobSerializer(page, many=True)
    return pagination.get_paginated_response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateJob(request):
    serializer = CreateJobSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)  

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def RecruiterJobs(request):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can view their jobs'}, status=status.HTTP_403_FORBIDDEN)
    recruiter = user.recruiterprofile
    jobs = Job.objects.filter(recruiter = recruiter)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def UpdateJob(request, job_id):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can update their jobs'}, status=status.HTTP_403_FORBIDDEN)
    job = get_object_or_404(Job, id=job_id)
    recruiter = user.recruiterprofile
    if job.recruiter != recruiter:
        return Response({'error': 'You are not authorized to update this job '}, status = status.HTTP_403_FORBIDDEN)
    serializer = CreateJobSerializer(job, data = request.data, partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteJob(request, job_id):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can delete their jobs'}, status=status.HTTP_403_FORBIDDEN)
    job = get_object_or_404(Job, id=job_id)
    recruiter = user.recruiterprofile
    if job.recruiter != recruiter:
        return Response({'error': 'You are not authorized to delete this job '}, status = status.HTTP_403_FORBIDDEN)
    job.delete()
    return Response({'message': 'Job deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def ToggleJobStatus(request, job_id):
    user = request.user
    if user.role != 'recruiter':
        return Response({'error': 'Only recruiters can toggle job status'}, status=status.HTTP_403_FORBIDDEN)
    job = get_object_or_404(Job, id=job_id)
    recruiter = user.recruiterprofile
    if job.recruiter != recruiter:
        return Response({'error': 'You are not authorized to toggle this job status '}, status = status.HTTP_403_FORBIDDEN)
    if job.is_open:
        job.is_open = False
    else:
        job.is_open = True
    job.save()
    return Response({'message': f'Job status toggled to {"active" if job.is_open else "inactive"}'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def JobDetail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    serializer = JobSerializer(job)
    return Response(serializer.data, status=status.HTTP_200_OK)