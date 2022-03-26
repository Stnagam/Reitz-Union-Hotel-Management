package models

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	BookingID     string    `gorm:"primary_key"  json:"bookingID"`
	RoomID        uint      `gorm:"primary_key" json:"roomID"`
	Email         string    `json:"email"`
	NoOfGuests    int32     `json:"noOfGuests"`
	NoOfChildren  int32     `json:"noOfChildren"`
	CheckIn       time.Time `json:"checkin"`
	CheckOut      time.Time `json:"checkout"`
	Amount        string    `json:"amount"`
	PaymentStatus string    `json:"paymentStatus"`
	ReserveRooms  string    `gorm:"-" json:"reserveRooms"`
}

type RoomPrice struct {
	NoOfRoomsToBook uint   `json:"noOfRoomsToBook"`
	Amount          string `json:"amount"`
	ReserveRooms    string `json:"reserveRooms"`
}
