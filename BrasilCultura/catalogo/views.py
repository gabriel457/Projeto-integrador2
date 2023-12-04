from django.shortcuts import render
from .models import Usuario
from django.http.response import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def pagina_Inicial(request):
    return render(request, 'paginaInicial/home.html')

def quem_somos(request):
    return render(request, 'somos/quem-somos.html')

def breve(request):
    return render(request, 'breve/embreve.html')

def cinema(request):
    return render(request, 'cinema/cinema.html')

def cadastro(request):
    if request.method == "GET":
        return render(request,'cadastroUsuario/cadastro.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        
        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse(f'Já existe um usuário com esse username {username}')
        
        user_by_email = User.objects.filter(email=email).first()
        
        user_by_email = User.objects.filter(email=email).first()
        if user_by_email:
            return HttpResponse(f'Falha no cadastro, tente novamente')

        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save()

        return render(request, 'login/login.html')

class CustomLoginView(LoginView):
    template_name = 'paginaInicial/home.html'

def login(request):
    if request.method == "GET":
        return render(request, 'login/login.html')
    else:
        username = request.POST.get('username')
        senha = request.POST.get('senha')

        user = authenticate(username=username, password=senha)

        if user:
            return render(request, 'paginaInicial/home.html', {'user': user})
        else:
            return HttpResponse('Usuário ou senha errados')

#@login_required
#def minha_view_protegida(request):
#    return render(request, 'catalogo/minha_view_protegida.html')

def usuarios(request):
    novo_usuario = Usuario()
    novo_usuario.nome = request.POST.get('username')
    novo_usuario.email = request.POST.get('email')
    novo_usuario.senha = request.POST.get('senha')
    novo_usuario.save()

#@login_required
def pesquisa(request):
    return render(request, 'pesquisa/pesquisa.html')

def favoritos(request):
    return render(request, 'favoritos/favoritos.html')