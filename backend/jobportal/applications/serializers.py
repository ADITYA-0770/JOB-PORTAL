import email

from rest_framework import serializers
from .models import Application
from jobs.models import Job
from accounts.models import CandidateProfile, RecruiterProfile

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['job']        

class ApplyJobSerializer(serializers.ModelSerializer):
    applicant = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = Application
        fields = '__all__'

    def create(self, validated_data):
        request = self.context['request']
        user = request.user
        if user.role != 'candidate':
            raise serializers.ValidationError('Only Candidate can apply for job')
        
        applicant = CandidateProfile.objects.get(user = user)
        validated_data['applicant'] = applicant
        job = validated_data['job']
        
        if Application.objects.filter(applicant = applicant, job = job).exists():
            raise serializers.ValidationError('You already applied')
        if not applicant.resume:
            raise serializers.ValidationError({
                "resume": "Please upload your resume first."
            })

        # About check
        if not applicant.about:
            raise serializers.ValidationError({
                "about": "Please complete your profile first."
            })

        # Skills check
        if not applicant.skills:
            raise serializers.ValidationError({
                "skills": "Please add your skills."
            })

        validated_data["applicant"] = applicant

        job = validated_data["job"]

        if Application.objects.filter(
            applicant=applicant,
            job=job
        ).exists():
            raise serializers.ValidationError(
                "You have already applied for this job."
            )
        
        return Application.objects.create(**validated_data)


class ApplicationListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source = 'applicant.user.first_name', read_only = True)
    last_name = serializers.CharField(source = 'applicant.user.last_name', read_only = True)
    email = serializers.EmailField(source = 'applicant.user.email', read_only = True)
    phone = serializers.CharField(source = 'applicant.phone_number', read_only = True)
    city = serializers.CharField(source = 'applicant.city', read_only = True)
    job_title = serializers.CharField(source = 'job.title', read_only = True)
    cover_letter = serializers.CharField(source = 'applicant.cover_letter', read_only = True)
    resume = serializers.SerializerMethodField()
    headline = serializers.CharField(source = 'applicant.headline', read_only = True)
    about = serializers.CharField(source = 'applicant.about', read_only = True)
    skills = serializers.CharField(source = 'applicant.skills', read_only = True)
    experience = serializers.IntegerField(source = 'applicant.experience', read_only = True)
    education = serializers.CharField(source = 'applicant.education', read_only = True)
    github = serializers.URLField(source = 'applicant.github', read_only = True)
    linkedin = serializers.URLField(source = 'applicant.linkedin', read_only = True)
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id', 'applied_at', 'cover_letter', 'resume', 'status', 
            'first_name', 'last_name', 'email', 'phone', 'city', 'job_title',
            'headline', 'about', 'skills', 'experience', 'education', 
            'github', 'linkedin', 'profile_picture'
        ]

    def get_resume(self, obj):
        if obj.applicant and obj.applicant.resume:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.applicant.resume.url)
            return obj.applicant.resume.url
        return None

    def get_profile_picture(self, obj):
        if obj.applicant and obj.applicant.profile_picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.applicant.profile_picture.url)
            return obj.applicant.profile_picture.url
        return None

class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']      


class ApplicationStatusViewSerializer(serializers.ModelSerializer):
    company = serializers.CharField(source = 'RecruiterProfile.company_name', read_only = True)
    job_title = serializers.CharField(source = 'job.title', read_only = True)
    class Meta:
        model = Application
        fields = [ 'applied_at', 'status', 'company', 'job_title']      
        