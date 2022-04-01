package models

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	BookingID       string    `gorm:"primary_key"  json:"bookingID"`
	RoomID          uint      `gorm:"primary_key" json:"roomID"`
	TypeOfRoom      string    `json:"typeOfRoom"`
	NoOfRoomsToBook uint      `gorm:"-" json:"noOfRoomsToBook"`
	Email           string    `json:"email"`
	NoOfGuests      int32     `json:"noOfGuests"`
	NoOfChildren    int32     `json:"noOfChildren"`
	CheckInDummy    string    `gorm:"-" json:"checkInDummy"`
	CheckOutDummy   string    `gorm:"-" json:"checkOutDummy"`
	CheckIn         time.Time `json:"checkin"`
	CheckOut        time.Time `json:"checkout"`
	Amount          string    `json:"amount"`
	PaymentStatus   string    `json:"paymentStatus"`
	ReserveRooms    string    `gorm:"-" json:"reserveRooms"`
}

type RoomPrice struct {
	NoOfRoomsToBook       uint   `json:"noOfRoomsToBook"`
	DeluxeAmount          string `json:"deluxeAmount"`
	ExecutiveAmount       string `json:"executiveAmount"`
	DeluxeAvailability    bool   `json:"deluxeAvailability"`
	ExecutiveAvailability bool   `json:"executiveAvailability"`
	ReserveRooms          string `json:"reserveRooms"`
}
