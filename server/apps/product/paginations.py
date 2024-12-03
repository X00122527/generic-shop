from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination as BasePageNumberPagination

class PageNumberPagination(BasePageNumberPagination):
    page_size = 20
    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data['total_pages'] = self.page.paginator.num_pages
        response.data['current_page'] = self.page.number
        return response

class OffsetPagination(LimitOffsetPagination):
    default_limit = 20
    limit_query_param = 'limit'
    offset_query_param = 'offset'
    max_limit = 100