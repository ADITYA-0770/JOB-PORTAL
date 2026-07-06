from django.contrib import admin
from django.urls import path
from accounts import views

urlpatterns = [
    path('', views.UserList, name='UserList'),
    path('register/candidate/', views.CandidateRegistration, name='CandidateRegistration'),
    path('register/recruiter/', views.RecruiterRegistration, name='RecruiterRegistration'),
    path('login/', views.Login, name='Login'),
    path('profile/', views.Profile, name='Profile'),
]