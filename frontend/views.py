from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request, 'frontend/index.html')
    else: 
        return render(request, 'frontend/login.html')
    
class ReactAppView(LoginRequiredMixin, TemplateView):

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = {
            'username': self.request.user.username
        }
        return context