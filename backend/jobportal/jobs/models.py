from django.db import models

# Create your models here.

class Job(models.Model):
    recruiter = models.ForeignKey('accounts.RecruiterProfile', on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=255)
    description = models.TextField()    
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    job_type = models.CharField(max_length=50, choices=[('full-time', 'Full Time'), ('part-time', 'Part Time'), ('contract', 'Contract'), ('internship', 'Internship')])
    experience_required = models.IntegerField()
    deadline = models.DateTimeField()
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return self.title
     