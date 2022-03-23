package models

import "gorm.io/gorm"

type CustomerRequest struct {
	gorm.Model
	RequestID   string `gorm:"primary_key" json:"requestID"`
	EmployeeID  int64  `json:"employeeID"`
	RoomID      int64  `gorm:"primary_key" json:"roomNumber"`
	Email       string `gorm:"primary_key" json:"email"`
	RequestType string `json:"requestType"`
	Comment     string `json:"comment"`
	Status      string `json:"status"`
}
