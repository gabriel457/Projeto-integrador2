from django.urls import path, include
from django.views.generic import TemplateView
from .views import pagina_Inicial, login, cadastro, pesquisa, quem_somos, breve, cinema, favoritos
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', pagina_Inicial, name='pagina_inicial'),
    path('login/', login, name='login'),
    path('cadastro/', cadastro, name='cadastro'),
    path('pesquisa/', pesquisa, name='pesquisa'),
    path('accounts/', include('allauth.urls')),
    path('quem_somos', quem_somos, name='quem_somos'),
    path('breve', breve, name='breve'),
    path('cinema/', cinema, name='cinema'),
    path('embreve/', TemplateView.as_view(template_name='breve/embreve.html'), name='embreve'),
    path('emcartaz/', TemplateView.as_view(template_name='cinema/cinema.html'), name='emcartaz'),
    path('logout/', LogoutView.as_view(next_page='pagina_inicial'), name='logout'),
    path('favoritos/', favoritos, name='favoritos')
]