package models

import (
	"gorm.io/gorm"
)

type Otptable struct {
	gorm.Model
	Email    string `gorm:"primary_key" json:"email"`
	Otptoken string `json:"otptgen"`
}

type Resetpassword struct {
	gorm.Model
	Email    string `gorm:"primary_key" json:"email"`
	Password string `json:"password"`
	Otptoken string `json:"otptgen"`
}
