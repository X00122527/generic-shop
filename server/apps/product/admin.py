from django.contrib import admin, messages
from .models import Product, ProductImage, Status_Choices, ProductOption1
from django.utils.html import format_html
from django.utils.translation import ngettext

class ProductOptionInline(admin.TabularInline):
    model = ProductOption1
    fields = ["option_1_thumbnail_preview", "option_1_thumbnail", "option_1", "option_2_thumbnail_preview", "option_2_thumbnail", "option_2", "quantity"]
    readonly_fields = ('option_1_thumbnail_preview', 'option_2_thumbnail_preview')


    def option_1_thumbnail_preview(self, instance: ProductOption1):
        if instance.image:
            return format_html('<img src="{}" style="max-width:50px; max-height:50px"/>'.format(instance.option_1_thumbnail.url))
        return "-"

    def option_2_thumbnail_preview(self, instance: ProductOption1):
        if instance.image:
            return format_html('<img src="{}" style="max-width:50px; max-height:50px"/>'.format(instance.option_2_thumbnail.url))
        return "-"


class ProductImageInline(admin.TabularInline):
    model = ProductImage

    fields = ['image_preview', 'image', 'order']
    readonly_fields = ('image_preview',)


    def image_preview(self, instance: ProductImage):
        if instance.image:
            return format_html('<img src="{}" style="max-width:200px; max-height:200px"/>'.format(instance.image.url))
        return "-"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductImageInline,
        ProductOptionInline
    ]
    actions = ["make_inactive"]


    list_display = ["image_preview", "title", "quantity", "view_description"]  # indicates what is going to be seen in product main list page

    # currently not used
    @admin.display(empty_value="???")
    def view_description(self, obj):
        return obj.description[:20]

    @admin.display(empty_value="No image")
    def image_preview(self, obj):
        if len(obj.images.all())>0:
            return format_html('<img src="{}" style="max-width:200px; max-height:200px"/>'.format(obj.images.all()[0].image.url))


    @admin.action(description="Mark selected products are inactive")
    def make_inactive(self, request, queryset):
        updated = queryset.update(status=Status_Choices.INAC)
        self.message_user(
            request,
            ngettext(
                "%d product was successfully marked as inactive.",
                "%d product were successfully marked as inactive.",
                updated,
            )
            % updated,
            messages.SUCCESS,
        )
    # list_display = ['image_tag']

# admin.site.register([Product, ProductImage, ])
