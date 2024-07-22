from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers import BirdSerializer
from .serializers import OrderSerializer
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
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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