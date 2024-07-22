from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers import BirdSerializer, UserSerializer, OrderSerializer
from .models import Bird, Order

def LoginView(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return render(request, "frontend/index.html", {
                "message": "Successfully logged in."
            })
        else:
            return render(request, "frontend/login.html", {
                "message": "Invalid username and/or password."
            })
    return render(request, "frontend/login.html")

def RegisterView(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        email = request.POST["email"]
        user = User.objects.create_user(username, email, password)
        login(request, user)
        return redirect("index")
    else:
        return render(request, "frontend/register.html")    

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

@api_view(['GET'])
def user_info(request):
    """
    Retrieve user info.
    """
    user = request.user
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data, safe=False)