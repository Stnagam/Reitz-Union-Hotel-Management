package models

import (
	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	BookingID     string `gorm:"not null;unique" json:"bookingID"`
	Email         string `gorm:"primary_key" json:"email"`
	NoOfGuests    int32  `json:"noOfGuests"`
	NoOfChildren  int32  `json:"noOfChildren"`
	CheckIn       string `json:"checkin"`
	CheckOut      string `json:"checkout"`
	PaymentStatus string `json:"paymentStatus"`
}
