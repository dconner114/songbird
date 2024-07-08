from django.db import models

# Create your models here.
class Bird(models.Model):
    common_name = models.CharField(max_length=50, unique=True)
    scientific_name = models.CharField(max_length=100, unique=True)
    order = models.CharField(max_length=50)
    family = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    conservation_levels = {
        "LC": "Least Concern",
        "NT": "Near Threatened",
        "VU": "Vulnerable",
        "EN": "Endangered",
        "CR": "Critically Endangered",
        "EX": "Extinct"
    }

    conservation = models.CharField(max_length=2, choices=conservation_levels.items())
    
    def __str__(self):
        return self.common_name

