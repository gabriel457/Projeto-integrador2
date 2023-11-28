from django.urls import path, include
from .views import pagina_Inicial, login, cadastro, pesquisa

urlpatterns = [
    path('', pagina_Inicial, name='pagina_inicial'),
    path('login/', login, name='login'),
    path('cadastro/', cadastro, name='cadastro'),
    path('pesquisa/', pesquisa, name='pesquisa'),
    path('accounts/', include('allauth.urls'))
]