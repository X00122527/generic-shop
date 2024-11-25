from rest_framework.pagination import PageNumberPagination as BasePageNumberPagination


class PageNumberPagination(BasePageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data['total_pages'] = self.page.paginator.num_pages
        response.data['current_page'] = self.page.number
        return response