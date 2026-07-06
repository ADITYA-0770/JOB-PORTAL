from django.urls import path
from . import views

urlpatterns = [
    path('apply/', views.ApplyJob, name='ApplyJob'),
    path('applications/', views.ApplicationList, name='ApplicationList'),
    path('applications/<int:application_id>/status/', views.UpdateApplicationStatus, name='UpdateApplicationStatus'),
    path('my-applications/', views.viewApplicationStatus, name='viewApplicationStatus'),
]
