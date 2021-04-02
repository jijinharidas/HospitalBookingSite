from .models import Bookings
from rest_framework import serializers

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookings
        fields = '__all__'