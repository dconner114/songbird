from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import BirdSerializer
from .models import Bird

# Create your views here.
class BirdView(generics.CreateAPIView):
    queryset = Bird.objects.all()
    serializer_class = BirdSerializer