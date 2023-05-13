from rest_framework import serializers
from order.models import ShoppingCart, Order
from shop.models import Brand, Product, Slide, Category, Review, Area_of_work


class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class AreaOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area_of_work
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.ReadOnlyField(source='Brand.brand_name')
    category_name = serializers.ReadOnlyField(source='category.category_name')

    class Meta:
        model = Product
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShoppingCart
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
