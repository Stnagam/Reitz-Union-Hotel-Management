package handlers

import (
	"fmt"
	"net/smtp"
	"os"
)

func ConfirmationEmailHandler(mailid string, bid string) {
	// sender data
	from := os.Getenv("FromEmailAddr")
	password := os.Getenv("SMTPpwd")
	// receiver address
	//toEmail := os.Getenv("ToEmailAddr") //
	toEmail := mailid
	fmt.Println(toEmail)
	bookingid := bid

	to := []string{toEmail}
	// smtp - Simple Mail Transfer Protocol
	host := "smtp.mail.yahoo.com"
	port := "587"
	address := host + ":" + port
	// message

	subject := "Booking confirmation: Reitz Union Hotel"
	body := "Dear Customer\n,Your booking at the Reitz Union Hotel was successful!\nYour booking id is:\n"
	body = body + bookingid
	body = body + "\nRegards,\nReitz Union Hotel Team\n"

	message := []byte(subject + body)
	// athentication data
	// func PlainAuth(identity, username, password, host string) Auth
	auth := smtp.PlainAuth("", from, password, host)
	// send mail
	// func SendMail(addr string, a Auth, from string, to []string, msg []byte) error
	error := smtp.SendMail(address, auth, from, to, message)
	if error != nil {
		fmt.Println("error:", error)
	}
}
