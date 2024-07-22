from django.urls import path, re_path
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from . import views

urlpatterns = [
    path('', login_required(views.index), name='dashboard'),
]
