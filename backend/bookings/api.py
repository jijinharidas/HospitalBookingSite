from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from users.api import UserAPI
import datetime

from .serializers import BookingSerializer

from .models import Bookings

class BookingView(APIView):
    def get(self, request):
        if request.user.is_staff :
            dateformat = "%Y-%m-%d"
            dateString = datetime.date.today()
            bookings = Bookings.objects.all().filter(bookingDate = dateString)
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data)
        else:
            return Response({'status': False, 'message': 'UnAuthorized access'})
    def post(self, request):
        return Response({'status': False, 'message': 'Method not Allowed'})

class NewBooking(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = BookingSerializer

    def get(self, request):
        if request.user.is_staff :
            bookings = Bookings.objects.all().filter(bookingDate = datetime.date.today())
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data)
        return Response({'status': False, 'message': 'Method not Allowed'})

    def post(self, request,  *args, **kwargs):
        # print(self.request.data)
        dateformat = "%Y %m %d"
        dateString = self.request.data["bookingDate"]
        Bookingdate = datetime.datetime.strptime(dateString, dateformat).date()
        # print(Bookingdate)
        serializer = self.get_serializer(data={'bookingPatient':request.user.id, 'bookingTimeSlot': request.data['timeSlot'],'bookingDate':Bookingdate})
        
        if not serializer.is_valid():
            return Response({'status': False, 'message': 'The time slot is already taken'})
        bookings = serializer.save()

        return Response({'status': True, 'message': 'Booking Successful'})


    def get_object(self):
        return self.request.user