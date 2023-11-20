from django.contrib import admin
from django.urls import path, include
from catalogo.views import pagina_Inicial

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', pagina_Inicial, name='pagina_Inicial'),
    path('', include('catalogo.urls')),
]
