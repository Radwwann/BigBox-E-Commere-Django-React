from django.contrib import admin
from .models import Product, Laptop,Phone,PriceHistory,Category, Brand, Area_of_work ,Review,Slide



class ReviewsAdmin(admin.ModelAdmin):
    list_display = ['user', 'get_review_rating', 'Product_Name']


class pricehistoryAdmin(admin.TabularInline): 
    model = PriceHistory
    list_display = ['price', 'date']
    readonly_fields = ['price', 'date']
     
     
class CategoryAdmin(admin.ModelAdmin):
          list_display = ['category_name']
          
          
class BrandAdmin(admin.ModelAdmin):
          list_display = ['admin_brand_logo','brand_name']   
          
          
class Area_of_workAdmin(admin.ModelAdmin):
          list_display = ['name_of_area']              
          
          
class ProductAdmin(admin.ModelAdmin):
    list_display = ['admin_photo','Product_Name', 'price','price_after_discount', 'availability', 'quantity', 'created_at','get_areas']
    prepopulated_fields = {'slug': ('Product_Name',)}
    list_editable = ['quantity', 'price', 'availability' ]
    list_filter = ['active']
    inlines = [pricehistoryAdmin]
    
    
    def get_areas(self, obj):  
     return ", ".join([area.name_of_area for area in obj.Area_of_work.all()])
    get_areas.short_description = 'Areas'
    
    
    
class ProductlaptopAdmin(ProductAdmin):
    list_display = ['admin_photo','Product_Name','operating_system','ports','storage_type']
    list_editable = ['operating_system','ports','storage_type']
    
    
class ProductphoneAdmin(ProductAdmin):
    list_display = ['admin_photo','Product_Name','rear_camera','network_compatibility','water_resistance']
    list_editable = ['rear_camera','network_compatibility','water_resistance']
    
    
class SlideAdmin(admin.ModelAdmin):
    list_display = ['admin_slide','title']      
  
  

       
admin.site.register(Product, ProductAdmin)
admin.site.register(Laptop,ProductlaptopAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(Phone,ProductphoneAdmin)
admin.site.register(Brand,BrandAdmin)
admin.site.register(Area_of_work,Area_of_workAdmin)
admin.site.register(Review,ReviewsAdmin)
admin.site.register(Slide,SlideAdmin)

