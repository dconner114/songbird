from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import index

urlpatterns = [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
