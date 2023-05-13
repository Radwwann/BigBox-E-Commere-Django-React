
   
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.core.validators import RegexValidator
from registration.models import Customer

phone_regex = RegexValidator(
    regex=r'^[\+\(]?[0-9]{3}[\)\-\s]?[0-9]{3}[\s\-]?[0-9]{4,6}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)

   

class CustomerRegistrationForm(UserCreationForm):
    first_name = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    last_name = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'Last Name'}))
    phone = forms.CharField(validators=[phone_regex],required=True, widget=forms.TextInput(attrs={'placeholder': '+961 XXXXXXX'}))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': 'Email@gmail.com'}))
    date_of_birth = forms.DateField(input_formats=['%d-%m-%Y'], widget=forms.DateInput(attrs={'placeholder': 'Date of Birth (DD-MM-YYYY)', 'pattern': '[0-9]{2}-[0-9]{2}-[0-9]{4}'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'phone', 'date_of_birth', 'password1', 'password2')
    def save(self, commit=True):
        user = super().save(commit=False)
        user.save()
        customer = Customer.objects.create(user=user, first_name=self.cleaned_data['first_name'], 
                                           last_name=self.cleaned_data['last_name'],
                                           phone=self.cleaned_data['phone'],
                                           date_of_birth=self.cleaned_data['date_of_birth'])
        if commit:
            customer.save()
        return user
    
class CustomerEditForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ('first_name', 'last_name', 'phone', 'date_of_birth')

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100, required=True)
    password = forms.CharField(widget=forms.PasswordInput, required=True)
