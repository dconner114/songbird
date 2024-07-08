from django.urls import path
from .views import BirdView

urlpatterns = [
    path('birds/', BirdView.as_view())
]
