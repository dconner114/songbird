from rest_framework import serializers
from .models import User, Order, Bird

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]

class BirdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bird
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'common_name', 'scientific_name')