from django.db import models

class Ator(models.Model):
    nome = models.CharField(max_length=255)
    nascimento = models.DateField()
    nacionalidade = models.CharField(max_length=100)

class Avaliacao(models.Model):
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    filme = models.ForeignKey('Filme', on_delete=models.CASCADE)
    nota = models.DecimalField(max_digits=3, decimal_places=1)

class Categoria(models.Model):
    nome = models.CharField(max_length=255)

class Diretor(models.Model):
    nome = models.CharField(max_length=255)
    nascimento = models.DateField()
    nacionalidade = models.CharField(max_length=100)

class Filme(models.Model):
    titulo = models.CharField(max_length=255)
    ano = models.IntegerField()
    diretor = models.ForeignKey('Diretor', on_delete=models.CASCADE)
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE)

class Nacionalidade(models.Model):
    nome = models.CharField(max_length=100)

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    senha = models.CharField(max_length=255)


