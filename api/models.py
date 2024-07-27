from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    quizzes_taken = models.IntegerField(default=0)

class Order(models.Model):
    scientific_name = models.CharField(max_length=50, unique=True)
    common_name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.common_name + " (" + self.scientific_name + ")"

class Family(models.Model):
    scientific_name = models.CharField(max_length=50, unique=True)
    common_name = models.CharField(max_length=50, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.common_name + " (" + self.scientific_name + ")"

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
        return self.common_name + " (" + self.scientific_name + ")"

class BirdPhoto(models.Model):
    bird = models.ForeignKey(Bird, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="bird-images/")
    url = models.URLField(max_length=200)
    photographer = models.CharField(max_length=50)
    source = models.CharField(max_length=50)
    isPrimary = models.BooleanField(default=False)

    LICENSE_CHOICES = {
        "Pexels": "Pexels License",
        "CC0": "CC0 License",
    }

    license = models.CharField(max_length=50, choices=LICENSE_CHOICES)

    # Ensures that only one photo is marked as primary
    def save(self, *args, **kwargs):
        if self.isPrimary:
            # Unset the primary flag for all other photos of this bird
            BirdPhoto.objects.filter(bird=self.bird, isPrimary=True).update(isPrimary=False)
        super(BirdPhoto, self).save(*args, **kwargs)

    def author_string(self):
        return "Photo by " + self.photographer + " from " + self.source

    def __str__(self):
        return "Photo of " + self.bird.common_name + " by " + self.photographer