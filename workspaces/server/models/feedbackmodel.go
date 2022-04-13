package models

import (
	"gorm.io/gorm"
)

type Feedback struct {
	gorm.Model
	Email        string `json:"email"`
	FeedbackForm string `json:"feedbackform"`
}
