package models

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	BookingID     string    `gorm:"not null;unique" json:"bookingID"`
	Email         string    `gorm:"primary_key" json:"email"`
	NoOfGuests    int32     `json:"noOfGuests"`
	NoOfChildren  int32     `json:"noOfChildren"`
	CheckIn       time.Time `json:"checkin"`
	CheckOut      time.Time `json:"checkout"`
	PaymentStatus bool      `json:"paymentStatus"`
}
