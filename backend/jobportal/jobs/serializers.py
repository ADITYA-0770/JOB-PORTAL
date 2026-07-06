from rest_framework import serializers
from .models import Job
from accounts.models import RecruiterProfile

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class CreateJobSerializer(serializers.ModelSerializer):
    recruiter = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Job
        fields = ['title', 'description', 'location' ,'salary', 'job_type', 'experience_required', 'deadline', 'recruiter']

    def create(self, validated_data):
        request = self.context['request']
        user = request.user
        if user.role == 'recruiter':
            recruiter = RecruiterProfile.objects.get(user = user)
            validated_data['recruiter'] = recruiter
            return Job.objects.create(**validated_data)
        else:
            raise serializers.ValidationError('Only recruiters can create job postings')
