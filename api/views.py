import json
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers import BirdSerializer, UserSerializer, OrderSerializer
from .models import User, Bird, Order

@require_POST
def LoginView(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


@require_POST
def RegisterView(request):
    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    try:
        # Check if user with the provided username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'detail': 'Username already taken.'}, status=400)
        elif User.objects.filter(email=email).exists():
            return JsonResponse({'detail': 'Email already taken.'}, status=400)
        
        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)

        # Automatically log in the user after registration
        login(request, user)

        return JsonResponse({'detail': 'Successfully registered.'})
    
    except Exception as e:
        print(e)  # Log the error for debugging purposes
        return HttpResponseBadRequest('Registration failed. Please try again later.')


def LogoutView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def SessionView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def WhoamiView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})

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