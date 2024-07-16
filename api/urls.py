from django.urls import path
from . import views

urlpatterns = [
    path('birds/', views.BirdView.as_view(), name='bird-list'),
    path('orders/', views.order_list, name='order-list'),
]
