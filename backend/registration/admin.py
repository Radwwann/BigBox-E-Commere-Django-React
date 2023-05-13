from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from django.contrib import admin

from registration.forms import CustomerEditForm
from .models import Customer


admin.site.unregister(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'date_joined')
 


admin.site.register(User, UserAdmin)



class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone', 'date_of_birth', 'user_email', 'user_username','user_last_login', 'user_date_joined')

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'

    def user_username(self, obj):
        return obj.user.username
    user_username.short_description = 'Username'
    
    
    def user_last_login(self, obj):
        return obj.user.last_login
    user_last_login.short_description = 'Last login'

    def user_date_joined(self, obj):
        return obj.user.date_joined
    user_date_joined.short_description = 'Date joined'
    
    
    
    
    
    
    actions = ['update_customer']
    
    def update_customer(self, request, queryset):
        updated = 0
        for obj in queryset:
            form = CustomerEditForm(request.POST or None, instance=obj)
            if form.is_valid():
                form.save()
                updated += 1
        self.message_user(request, f"{updated} customer(s) were successfully updated.")
    update_customer.short_description = "Update selected customers"



admin.site.register(Customer, CustomerAdmin)