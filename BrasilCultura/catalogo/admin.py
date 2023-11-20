from django.contrib import admin
from .models import Filme
from .models import Usuario

admin.site.register(Filme)
admin.site.register(Usuario)