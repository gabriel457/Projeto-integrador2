from django.urls import path
from .views import pagina_Inicial, login, cadastro

urlpatterns = [
    path('', pagina_Inicial, name='pagina_inicial'),
    path('login', login, name='login'),
    path('cadastro/', cadastro, name='cadastro'),
]