from django import forms
from .models import Usuario

class CadastroForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'senha']