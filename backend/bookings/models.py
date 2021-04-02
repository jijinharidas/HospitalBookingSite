from django.db import models
from users.models import User
from datetime import date

class Bookings(models.Model):
    bookingID = models.AutoField(primary_key=True)
    bookingDate = models.DateField(default=date.today)
    bookingPatient = models.ForeignKey(User, on_delete=models.CASCADE)
    timeSlots = (
        ('1', '9.30 am - 10.00am'),
        ('2', '10.00 am - 10.30am'),
        ('3', '10.30 am - 11.00am'),
        ('4', '11.00 am - 11.30am'),
        ('5', '11.30 am - 12.00pm'),
        ('6', '2.00 pm - 2.00 pm'),
        ('7', '2.30 pm - 3.00 pm'),

    )

    bookingTimeSlot = models.CharField(max_length=300, choices=timeSlots)

    # Only one person can book a slot at a time
    class Meta:
        unique_together = (("bookingDate", "bookingTimeSlot"),)

    def __str__(self):
        return '{0} [{1}]'.format(self.bookingPatient.username, self.bookingDate)