from django.contrib import admin
from .models import  Order, ShoppingCart, CartItem


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


class ShoppingCartAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'created_at', 'total_quantity', 'total_price')
    list_filter = ('created_at',)
    search_fields = ('user__username','user__username__icontains', 'id__icontains')
    ordering = ('-created_at',)
    inlines = [CartItemInline]

    def user_name(self, obj):
        return obj.user.username
    user_name.short_description = 'Username'


admin.site.register(ShoppingCart, ShoppingCartAdmin)


class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id','cart', 'product', 'product_name', 'quantity', 'added_at')
    list_filter = ('added_at',)
    search_fields = ('cart__user__username__icontains',)
    ordering = ('added_at', 'cart')
    raw_id_fields = ('product',)

    def product_name(self, obj):
        return obj.product.Product_Name
    product_name.short_description = 'Product Name'


admin.site.register(CartItem, CartItemAdmin)




class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','user_name', 'order_date', )
    list_filter = ('status', 'order_date')
    
  

admin.site.register(Order, OrderAdmin)























""""
class OrderDetailInline(admin.TabularInline):
    model = OrderDetail
    extra = 0

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_name', 'order_date', 'total_amount', 'status', 'updated')
    list_filter = ('status', 'order_date')
    search_fields = ('id', 'user__username')
    inlines = [OrderDetailInline]
    ordering = ('-order_date',)

admin.site.register(Order, OrderAdmin)
"""

