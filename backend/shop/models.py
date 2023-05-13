import django
import admin
from django.db import models
from django.conf import settings
from django.utils.html import format_html
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
import os


class Category(models.Model):
    category_name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.category_name


class Brand(models.Model):
    brand_name = models.CharField(max_length=100, db_index=True)
    brand_logo = models.ImageField(upload_to="brandLogo/")
    category = models.ManyToManyField(Category)

    def admin_brand_logo(self):
        return format_html('<img src="{}" width="50" height="50" />'.format(self.brand_logo.url))
    admin_brand_logo.short_description = 'brand_logo'
    brand_logo.allow_tags = True

    def __str__(self):
        return self.brand_name


class Area_of_work(models.Model):
    name_of_area = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name_of_area


class Product(models.Model):
    Product_Name = models.CharField(max_length=100, db_index=True)
    slug = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="images/")
    quantity = models.PositiveIntegerField(default=1)
    CPU = models.TextField(max_length=250, default="info")
    GPU = models.TextField(max_length=250, default="info")
    RAM_size = models.PositiveIntegerField(default=1)
    display_size = models.DecimalField(max_digits=5, decimal_places=2, default=67.7)
    display_resolution = models.CharField(max_length=100, default="info")
    storage_capacity = models.PositiveIntegerField(default=1)
    battery_info = models.CharField(max_length=100, default="info")
    front_camera = models.CharField(max_length=100, default="info")
    weight = models.DecimalField(max_digits=5, decimal_places=2, default=98.7)
    availability = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=django.utils.timezone.now)
    modified_at = models.DateTimeField(auto_now=True)
    URL_Video = models.URLField(blank=True)
    name_Discount = models.CharField(max_length=100, blank=True)
    discount_Description = models.TextField(blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    price_after_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_created_at = models.DateTimeField(default=django.utils.timezone.now)
    discount_Modified_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    Brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    Area_of_work= models.ManyToManyField(Area_of_work)

    def admin_photo(self):
        return format_html('<img src="{}" width="100" height="100" />'.format(self.image.url))
    admin_photo.short_description = 'Image'
    image.allow_tags = True

    def __str__(self):
        return self.Product_Name

    def increment_views(self):
        self.views += 1
        self.save()

    def save(self, *args, **kwargs):
        discount = self.price * (self.discount_percentage / 100)
        self.price_after_discount = self.price - discount
        super().save(*args, **kwargs)

    def delete_image(self):
        if self.image:
            os.remove(self.image.path)


@receiver(post_delete, sender=Product)
def delete_image(sender, instance, **kwargs):
       instance.delete_image() 


class Laptop(Product):
    operating_system = models.CharField(max_length=255, blank=True)
    ports = models.CharField(max_length=255, blank=True)
    storage_type = models.CharField(max_length=3, choices=[('SSD', 'Solid State Drive'), ('HDD', 'Hard Disk Drive')])


class Phone(Product):
    water_resistance_choice = (
        ('water_resistance', 'water resistance'), ('Not_water_resistance', 'Not water resistance'))
    rear_camera = models.CharField(max_length=255, blank=True, default="h")
    network_compatibility = models.CharField(max_length=255, blank=True, default="h")
    water_resistance = models.CharField(max_length=255, choices=water_resistance_choice, default='Not_water_resistance')


        #  or use this  def increment_views(self):
        # self.__class__.objects.filter(pk=self.pk).update(views=F('views') + 1)


class PriceHistory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=Product)
def update_price_history(sender, instance, **kwargs):
    # Retrieve the latest price from the PriceHistory model
    try:
        old_price = instance.pricehistory_set.latest('date').price
    except PriceHistory.DoesNotExist:
        old_price = None
    # If the old price is different from the current price, create a new PriceHistory instance
    if old_price != instance.price:
        PriceHistory.objects.create(
            product=instance, price=instance.price
        )


class Slide(models.Model):
    image = models.ImageField(upload_to="slideshow/")
    title = models.CharField(max_length=255)
    description = models.TextField()

    def admin_slide(self):
        return format_html('<img src="{}" width="100" height="100" />'.format(self.image.url))
    admin_slide.short_description = 'Image'
    image.allow_tags = True

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Get the current number of slides
        num_slides = Slide.objects.count()

        # If there are already 4 slides, delete the oldest one
        if num_slides == 4:
            oldest_slide = Slide.objects.order_by('id').first()
            oldest_slide.delete()

        # Save the current slide
        super().save(*args, **kwargs)

    def delete_image(self):
        if self.image:
            # Delete the image file from the filesystem
            os.remove(self.image.path) 


@receiver(post_delete, sender=Slide)
def delete_image(sender, instance, **kwargs):
       instance.delete_image() 


class Review(models.Model):
    RATING = (
           ('1', '1'),
           ('2', '2'),
           ('3', '3'),
           ('4', '4'),
           ('5', '5'),
            )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text_review = models.TextField(max_length=100, null=True)
    review_rating = models.CharField(choices=RATING, max_length=150, null=True)
    date_of_the_review = models.DateTimeField(
                                        default=django.utils.timezone.now)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'product']
        verbose_name_plural = 'Reviews'

    def get_review_rating(self):
        return self.review_rating

    def Product_Name(self):
        return self.product.Product_Name


"""
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text_review = models.TextField(max_length=100, null=True)
    rate_up = models.PositiveIntegerField(default=0)
    rate_down = models.PositiveIntegerField(default=0)
    date_of_the_review = models.DateTimeField(default=django.utils.timezone.now)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'product']
"""
