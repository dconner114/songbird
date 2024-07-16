from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers import BirdSerializer
from .serializers import OrderSerializer
from .models import Bird, Order

# Create your views here.
class BirdView(generics.CreateAPIView):
    queryset = Bird.objects.all()
    serializer_class = BirdSerializer

@api_view(['GET'])
def order_list(request):
    """
    Retrieve a specific order by its ID.
    """
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return JsonResponse(serializer.data, safe=False)