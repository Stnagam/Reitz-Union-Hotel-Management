package models

import "gorm.io/gorm"

type CustomerRequest struct {
	gorm.Model
	RequestID   string `gorm:"primary_key" json:"requestID"`
	EmployeeID  string `json:"employeeID"`
	RoomID      int    `json:"roomNumber"`
	Email       string `json:"email"`
	RequestType string `json:"requestType"`
	Comment     string `json:"comment"`
	Status      string `json:"status"`
}
