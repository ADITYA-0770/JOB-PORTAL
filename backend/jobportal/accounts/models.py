from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None

    email = models.EmailField(unique=True)

    role = models.CharField(
        choices=[
            ('candidate', 'candidate'),
            ('recruiter', 'recruiter'),
            ('admin', 'admin')
        ],
        max_length=20
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class CandidateProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)
    cover_letter = models.TextField(blank=True)
    headline = models.CharField(max_length=200, blank=True)
    about  = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    experience = models.PositiveIntegerField(default=0)
    education = models.CharField(max_length=200, blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class RecruiterProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    company_website = models.URLField(blank=True)
    about = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.company_name}"
    