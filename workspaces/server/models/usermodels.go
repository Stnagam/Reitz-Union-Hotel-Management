package models

import (
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `gorm:"primary_key" json:"email"`
	Password  string `json:"password"`
	Mobile    int32  `json:"mobile"`
	Age       int16  `json:"age"`
}

type ErrorResponse struct {
	Err string
}

type Token struct {
	gorm.Model
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `gorm:"primary_key" json:"email"`
	*jwt.StandardClaims

}

