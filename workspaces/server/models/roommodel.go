package models

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	RoomID uint `gorm:"primary_key"  json:"roomID"`
	Price  int  `json:"price"`
}
