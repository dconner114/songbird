from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView, name='login'),
    path('register/', views.RegisterView, name='register'),
    path('orders/', views.order_list, name='order-list'),
    path('user-info/', views.user_info, name='user-info'),
]
