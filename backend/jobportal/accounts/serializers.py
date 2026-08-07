from .models import User, CandidateProfile, RecruiterProfile
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CandidateProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = CandidateProfile
        fields = '__all__'

class RecruiterProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = RecruiterProfile
        fields = '__all__'

class CandidateRegistrationSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(write_only = True)
    city = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'phone_number', 'city']

    def create(self, validated_data):
        phone_number = validated_data.pop('phone_number')
        city = validated_data.pop('city')
        user = User.objects.create_user(role='candidate', **validated_data)
        CandidateProfile.objects.create(user=user, phone_number=phone_number, city=city )
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value
    
class RecruiterRegistrationSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(write_only = True)
    city = serializers.CharField(write_only = True)
    company_name = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'phone_number', 'city', 'company_name']

    def create(self, validated_data):
        phone_number = validated_data.pop('phone_number')
        city = validated_data.pop('city')
        company_name = validated_data.pop('company_name')
        user = User.objects.create_user(role='recruiter', **validated_data)
        RecruiterProfile.objects.create(user=user, phone_number=phone_number, city=city, company_name=company_name)
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value    
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class CandidateProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = [
    "phone_number",
    "city",
    "resume",
    "about",
    "skills",
    "experience",
    "education",
    "profile_picture",
]   

class RecruiterProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruiterProfile
        fields = ['phone_number', 'city', 'company_name', 'company_website', 'about', 'profile_picture']



