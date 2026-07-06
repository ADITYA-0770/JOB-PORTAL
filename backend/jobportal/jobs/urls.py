from django.urls import path
from . import views

urlpatterns = [
    path('', views.JobList, name="JobList"),
    path('create/', views.CreateJob, name="CreateJob"),
    path('recruiter-jobs/', views.RecruiterJobs, name="RecruiterJobs"),
    path('jobs/<int:job_id>/', views.UpdateJob, name='UpdateJob'),
    path('jobs/<int:job_id>/toggle/', views.ToggleJobStatus, name='ToggleJobStatus')
]