from rest_framework import serializers
from .models import User, Order, Bird, Achievement

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "quizzes_taken"]

class BirdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bird
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'common_name', 'scientific_name')

class AchievementSerializer(serializers.ModelSerializer):
    isEarned = serializers.BooleanField()

    class Meta:
        model = Achievement
        fields = ['id', 'name', 'description', 'image', 'isEarned']
