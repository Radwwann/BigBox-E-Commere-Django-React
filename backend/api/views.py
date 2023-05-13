from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from order.models import ShoppingCart, Order
from .serializers import ProductSerializer, CartSerializer, BrandSerializer, SlideSerializer, CategorySerializer, ReviewSerializer, OrderSerializer, AreaOfWorkSerializer
from shop.models import Brand, Product, Slide, Review, Category, Area_of_work
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def getUserId(request):
    return Response({"userid": request.user.id})


@api_view(['GET'])
def getProduct(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAreaOfWork(request):
    areas = Area_of_work.objects.all()
    serializer = AreaOfWorkSerializer(areas, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBrands(request):
    brands = Brand.objects.all()
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSlides(request):
    slides = Slide.objects.all()
    serializer = SlideSerializer(slides, many=True)
    return Response(serializer.data)


@login_required(login_url="/registration/register/")
@api_view(['POST'])
def postReview(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@login_required(login_url="/registration/register")
@api_view(['POST'])
def createOrder(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getReviewByItem(request, item_id):
    reviews = Review.objects.filter(product=item_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@login_required
@api_view(['GET'])
def getReviewByUser(request):
    reviews = Review.objects.filter(user=request.user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@login_required
@api_view(['GET'])
def getUserOrders(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUserRole(request):
    if request.user.is_superuser:
        return Response({"role": 1})

    if request.user.is_authenticated:
        return Response({"role": 0})
    return Response({"message": "user must be logged in"})


@api_view(['GET'])
def getProductByID(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"message": "item does not exist"})
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['GET'])
def filterByAOW(request, aow):
    products = Product.objects.filter(Area_of_work=aow)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def filterByCategory(request, category_name):
    products = Product.objects.filter(category=category_name)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def filterByBrand(request, brandname):
    products = Product.objects.filter(Brand=brandname)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def rangeProduct(request, min_price, max_price):
    products = Product.objects.filter(price__range=(min_price, max_price))
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@login_required
@api_view(['GET'])
def getCart(request):
    shopping_cart = ShoppingCart.objects.get(user=request.user)
    serializer = CartSerializer(shopping_cart, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search_product(request, query):
    products = Product.objects.filter(Product_Name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def brandProduct(request, brand_name):
    products = Brand.objects.filter(brand_name=brand_name)
    serializer = BrandSerializer(products, many=True)
    return Response(serializer.data)
