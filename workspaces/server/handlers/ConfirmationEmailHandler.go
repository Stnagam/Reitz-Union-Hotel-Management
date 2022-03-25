package handlers

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
)

func ConfirmationEmailHandler(mailid string, bid string) {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
	msg := gomail.NewMessage()
	msg.SetHeader("From", os.Getenv("FROMEMAILADDRESS"))
	msg.SetHeader("To", mailid)
	msg.SetHeader("Subject", "Booking ID: "+bid+" - Reitz Union Hotel")
	msg.SetBody("text/html", "Thanks for doing business with Reitz Union Hotel. <br><br>Your booking ID for your upcoming stay is: "+bid+"<br><br>Hope you have a pleasant stay at the Reitz Union Hotel.")

	n := gomail.NewDialer("smtp.mail.yahoo.com", 587, os.Getenv("FROMEMAILADDRESS"), os.Getenv("SMTPPASSWORD"))
	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		fmt.Println("error:", err)
	} else {
		fmt.Println("mail has been sent")
	}
}
