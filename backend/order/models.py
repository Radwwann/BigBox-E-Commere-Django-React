import datetime
import random
from django.db import models
from shop.models import Product
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(models.Model):
    ORDER_STATUS = (
        ('Pending', 'Pending'),
        ('delivered', 'delivered'),
        ('Cancel', 'cancel order'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='order_user')
    address_line = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    payment_method = models.CharField(max_length=20, choices=(('paypal', 'Paypal'), ('door', 'Pay on Door')))
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_quantity = models.IntegerField()
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product")
    status = models.CharField(max_length=20, choices=(('unpaid', 'Unpaid'), ('paid', 'Paid'), ('cancelled', 'Cancelled')), default='unpaid')
    order_date = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS, default='Pending')

    def payment_method(self):
        return self.payment_method

    def __str__(self):
        return 'Order #{}'.format(self.id)

    def user_name(self):
        User = get_user_model()
        user = User.objects.get(id=self.user.id)
        return user.username

    def product_name(self):
        return self.product_name

    def mark_delivered(self):
        self.order_status = 'delivered'
        self.save(update_fields=['order_status'])

    def generate_transaction_id(self):
        transaction_id = str(datetime.now().date()) + '-' + str(random.randint(1000, 9999))
        self.transaction_id = transaction_id
        self.save()

    def generate_invoice_number(self):
        invoice_number = str(datetime.now().date()) + '-' + str


class ShoppingCart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_user')
    created_at = models.DateTimeField(auto_now_add=True)
    total_quantity = models.IntegerField(default=0)
    total_quantity_each_cartitems = models.IntegerField(default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return 'shoppingcart #{} for {}'.format(self.id, self.user.username)


class CartItem(models.Model):
    cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    added_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.product.Product_Name} - {self.quantity} units"
