from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view
from shop.models import Product
from .models import ShoppingCart, CartItem


@login_required(login_url="/registration/register/")
@login_required
def shopping_cart(request):
    try:
        cart = ShoppingCart.objects.get(user=request.user)
    except ShoppingCart.DoesNotExist:
        cart = ShoppingCart.objects.create(user=request.user)
    cart_items = CartItem.objects.filter(cart=cart)
    if request.is_ajax():
        return JsonResponse({
            'items_count': cart.get_items_count(),
            'total_price': cart.total_price
        })
    context = {
        'cart': cart,
        'cart_items': cart_items
    }
    return render(request, 'shopping_cart.html', context)


@api_view(['GET'])
@login_required(login_url="/registration/register/")
def add_to_cart(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'})
    if not product.active or product.quantity <= 0:
        return JsonResponse({'error': 'Product is not available'})
    try:
        cart = ShoppingCart.objects.get(user=request.user)
    except ShoppingCart.DoesNotExist:
        cart = ShoppingCart.objects.create(user=request.user)
    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.quantity += 1
        cart_item.save()
    except CartItem.DoesNotExist:
        cart_item = CartItem.objects.create(cart=cart,
                                            product=product,
                                            quantity=1
                                            )
    cart.total_quantity += 1
    cart.total_price += cart_item.product.price
    cart.save()
    product.quantity -= 1
    product.save()
    return JsonResponse({'success': 'Item added to cart'})


@login_required(login_url="/registration/register/")
def remove_from_cart(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'})
    try:
        cart = ShoppingCart.objects.get(user=request.user)
    except ShoppingCart.DoesNotExist:
        return JsonResponse({'error': 'Cart not found'})
    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
        else:
            cart_item.delete()
        cart.total_quantity -= 1
        cart.total_price -= cart_item.product.price
        cart.save()
        product.quantity += 1
        product.save()
        return JsonResponse({'success': 'Item removed from cart'})
    except CartItem.DoesNotExist:
        return JsonResponse({'error': 'Item not found in cart'})


@login_required(login_url="/registration/register/")
def update_cart_item_quantity(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'})
    try:
        cart = ShoppingCart.objects.get(user=request.user)
    except ShoppingCart.DoesNotExist:
        return JsonResponse({'error': 'Cart not found'})
    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        quantity = int(request.POST.get('quantity'))
        if quantity <= 0 or quantity > product.quantity:
            return JsonResponse({'error': 'Invalid quantity'})
        cart.total_quantity += quantity - cart_item.quantity
        cart.total_price += (quantity - cart_item.quantity) * product.price
        cart.save()
        product.quantity -= (quantity - cart_item.quantity)
        product.save()
        cart_item.quantity = quantity
        cart_item.save()
        return JsonResponse({'success': 'Cart item quantity updated'})
    except CartItem.DoesNotExist:
        return JsonResponse({'error': 'Item not found in cart'})


"""

def shopping_cart(request):
    user = request.user
    try:
        cart = ShoppingCart.objects.get(user=user)
    except ShoppingCart.DoesNotExist:
        cart = ShoppingCart.objects.create(user=user)
    cart_items = CartItem.objects.filter(cart=cart)
    context = {
        'cart': cart,
        'cart_items': cart_items
    }
    return render(request, 'shopping_cart.html', context)



def add_to_cart(request, product_id):
    user = request.user
    try:
        cart = ShoppingCart.objects.get(user=user)
    except ShoppingCart.DoesNotExist:
        cart = ShoppingCart.objects.create(user=user)
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'})
    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.quantity += 1
        cart_item.save()
    except CartItem.DoesNotExist:
        cart_item = CartItem.objects.
                            create(cart=cart, product=product, quantity=1)
    cart.total_quantity += 1
    cart.total_price += cart_item.product.price
    cart.save()
    return JsonResponse({'success': 'Item added to cart'})
"""
