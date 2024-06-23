from django.urls import path
from apps.user.views import LoginApiView, SignupApiView,UpdatePassword
from django.contrib.auth import views as auth_views

urlpatterns = [
	path('login', LoginApiView.as_view(), name='login'),
	path('signup', SignupApiView.as_view(), name='signup'),
	path('change_password/<int:pk>/', UpdatePassword.as_view(), name='change_password'),

	path('reset_password/', auth_views.PasswordResetView.as_view(), name="reset_password"),
	path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
	path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
	path('reset_password_comeplete/', auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),
]
