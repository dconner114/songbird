from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Order(models.Model):
    scientific_name = models.CharField(max_length=50, unique=True)
    common_name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.common_name


class Family(models.Model):
    scientific_name = models.CharField(max_length=50, unique=True)
    common_name = models.CharField(max_length=50, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.common_name
    

class Bird(models.Model):
    common_name = models.CharField(max_length=50, unique=True)
    scientific_name = models.CharField(max_length=100, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
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

