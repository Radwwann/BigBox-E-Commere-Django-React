from django.shortcuts import get_object_or_404, redirect, render
from .models import Phone, Product,Slide, Laptop,Brand
from .models import Brand


def home_page(request):
    context = {
        'Brand':  Brand.objects.all(),
        'phones': Phone.objects.all(),
        'slide': Slide.objects.all(),
        'laptops': Laptop.objects.all(),
     }
    return render(request, "home.html", context)


def search(request):
    q = request.GET.get('q', '')
    if not q:
        return redirect('shop:home_page')
    data = Product.objects.filter(Product_Name__icontains=q).order_by("-id")
    return render(request, "search.html", {"data": data})


def brand_product_list(request,brand_id):
    brand=Brand.objects.get(id=brand_id)
    data=Product.objects.filter(Brand=brand).order_by('-id')
    return render(request,"listOF_brand.html",{
        'data': data,
    })


def policy(request):
    return render(request, "shipping_policy.html")
