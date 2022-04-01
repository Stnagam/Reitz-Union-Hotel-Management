package models

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	RoomID     uint   `gorm:"primary_key"  json:"roomID"`
	TypeOfRoom string `json:"typeOfRoom"`
	Price      int    `json:"price"`
}
