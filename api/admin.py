from django.contrib import admin
from .models import User, Family, Order, Bird

# Register your models here.
admin.site.register(User)
admin.site.register(Family)
admin.site.register(Order)
admin.site.register(Bird)