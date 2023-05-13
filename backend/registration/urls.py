from django.urls import include, path, reverse_lazy
from registration import views
from django.contrib.auth import views as logviews



app_name= 'registration'
urlpatterns = [
    path('register/', views.register, name ='register'),
    path('logout/', logviews.LogoutView.as_view(), name='logout'),
    path('sign-in/', views.login_view, name='login_view'),
    path('passwordreset/', logviews.PasswordChangeView.as_view(template_name='resetPassword.html',success_url=reverse_lazy('registration:password_change_done')), name='passwordreset'),
    path('passwordreset/Passworddone/', logviews.PasswordChangeDoneView.as_view(template_name='Passworddone.html'), name='password_change_done'),

      path('password_reset/',
        logviews.PasswordResetView.as_view(success_url=reverse_lazy('registration:password_reset_done'), 
                                           template_name="registration/password_reset_form.html"),name='password_reset'),

    path('reset_password_done/',
         logviews.PasswordResetDoneView.as_view(template_name="registration/password_reset_done.html"), 
        name='password_reset_done'),

    path('reset/<uidb64>/<token>/',logviews.PasswordResetConfirmView.as_view
         (success_url=reverse_lazy('registration:password_reset_complete'),
            template_name="registration/password_reset_confirm.html"), 
        name='password_reset_confirm'),

    path('reset_password_complete/', 
        logviews.PasswordResetCompleteView.as_view(template_name="registration/password_reset_complete.html"), 
        name='password_reset_complete'),

]
