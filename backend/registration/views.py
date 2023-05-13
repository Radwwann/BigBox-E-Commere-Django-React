from django.shortcuts import render, redirect
from django.contrib.auth import login as register_auth
from .forms import CustomerRegistrationForm, LoginForm
from django.contrib.auth import authenticate, login


def register(request):
    form = CustomerRegistrationForm()
    if request.method == 'POST':
        form = CustomerRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            register_auth(request, user)
            return redirect('http://localhost:3000/')
    return render(request, 'register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('http://localhost:3000/')
            else:
                form.add_error(None, "Invalid username or password")
    else:
        form = LoginForm()
    return render(request, 'sign_in.html', {'form': form})
