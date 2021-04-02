from django.urls import path
from . import api

urlpatterns = [
    path('', api.BookingView.as_view()),
    path('booking', api.NewBooking.as_view()),
]
