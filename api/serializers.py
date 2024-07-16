from rest_framework import serializers
from .models import Order, Bird

class BirdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bird
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'common_name', 'scientific_name')