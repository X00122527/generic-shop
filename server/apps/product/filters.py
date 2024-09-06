import django_filters
from apps.product.models import Product

class ProductFilter(django_filters.FilterSet):

    class Meta:
        model = Product
        fields = ['title', 'price_min', 'price_max', ]

    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    #materials = django_filters.CharFilter(field_name='material', lookup_expr='iexact')



