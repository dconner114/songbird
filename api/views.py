import json
import random
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

@require_POST
def get_questions(request):
    try:
        data = json.loads(request.body)
        num_questions = int(data.get('numQuestions'))
        try:
            order = int(data.get('order'))
        except ValueError:
            order = None
        print(num_questions, order)
    except json.JSONDecodeError:
        return JsonResponse({'detail': 'Invalid JSON.'}, status=400)
    except ValueError:
        return JsonResponse({'detail': 'Invalid value.'}, status=400)

    if num_questions is None or num_questions < 1:
        return JsonResponse({'detail': 'Questions number must be greater than 0'}, status=400)
    
    if order is None:
        birds = Bird.objects.all()
    else:
        birds = Bird.objects.filter(order_id=order)

    if birds.count() < num_questions:
        return JsonResponse({'detail': 'Not enough birds available for the selected order. Please reduce the number of questions.'}, status=400)

    questions = []
    bird_list = list(birds)
    random.shuffle(bird_list)

    for bird in bird_list[:int(num_questions)]:
        correct_answer = {
            'id': bird.id,
            'common_name': bird.common_name,
            'scientific_name': bird.scientific_name,
        }
        
        wrong_answers = list(Bird.objects.exclude(id=bird.id).order_by('?')[:3])
        choices = [correct_answer] + [
            {'id': wrong_bird.id, 'common_name': wrong_bird.common_name, 'scientific_name': wrong_bird.scientific_name}
            for wrong_bird in wrong_answers
        ]
        random.shuffle(choices)
        questions.append({
            'correct_answer': correct_answer,
            'choices': choices
        })

    return JsonResponse({'questions': questions})

@require_POST
def submit_quiz(request):
    try:
        data = json.loads(request.body)
        correct_answers = data.get('correctAnswers')
        choices = data.get('choices')
        print(correct_answers, choices)
    except json.JSONDecodeError:
        return JsonResponse({'detail': 'Invalid JSON.'}, status=400)
    except ValueError:
        return JsonResponse({'detail': 'Invalid value.'}, status=400)

    if len(correct_answers) != len(choices):
        return JsonResponse({'detail': 'Number of correct answers and choices must match.'}, status=400)

    for correct_answer, choice in zip(correct_answers, choices):
        if correct_answer != int(choice):
            return JsonResponse({'detail': 'Incorrect answer.'}, status=400)

    return JsonResponse({'detail': 'Correct answer.'})

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