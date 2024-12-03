import django_filters
from apps.product.models import Product
from rest_framework.filters import OrderingFilter
from django.db.models import Count


class CustomProductOrderingFilter(OrderingFilter):
    def filter_queryset(self, request, queryset, view):
        ordering = self.get_ordering(request, queryset, view)
        if ordering and any('popularity' in field for field in ordering):
            queryset = queryset.annotate(popularity=Count('favorites'))

        return super().filter_queryset(request, queryset, view)

class ProductFilter(django_filters.FilterSet):

    class Meta:
        model = Product
        fields = ['title', 'price_min', 'price_max', ]

    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    item_type = django_filters.CharFilter(field_name='item_type', lookup_expr='iexact', )
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    #materials = django_filters.CharFilter(field_name='material', lookup_expr='iexact')



