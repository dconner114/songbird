from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView, name='login'),
    path('register/', views.RegisterView, name='register'),
    path('logout/', views.LogoutView, name='logout'),
    path('session/', views.SessionView, name='session'),
    path('whoami/', views.WhoamiView, name='whoami'),
    path('orders/', views.order_list, name='order-list'),
    path('user-info/', views.user_info, name='user-info'),
    path('get-questions/', views.get_questions, name='get-questions'),
    path('submit-quiz/', views.submit_quiz, name='submit-quiz'),
    path('achievements/', views.achievement_view, name='achievements'),
]
