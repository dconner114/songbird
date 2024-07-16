from django.contrib import admin
from .models import Family, Order, Bird

# Register your models here.
admin.site.register(Family)
admin.site.register(Order)
admin.site.register(Bird)