package handlers

import (
	"crypto/rand"
	"encoding/base32"
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"server/models"
	"server/utils"
)

//function to generate otp number
func getToken(length int) string {
	randomBytes := make([]byte, 32)
	_, err := rand.Read(randomBytes)
	if err != nil {
		panic(err)
	}
	return base32.StdEncoding.EncodeToString(randomBytes)[:length]
}

//entry point of handler
func OTPGenerationHandler(w http.ResponseWriter, r *http.Request) {

	//check if user email id exists or not
	user := &models.User{}
	newotp := &models.Otptable{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	toEmail := user.Email
	to := []string{toEmail}
	if err := utils.DB.Where("Email = ?", to).First(user).Error; err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Email address not found"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	//delete old otp if exists for the user
	newotp.Email = user.Email
	if err := utils.DB.Where("Email = ?", to).First(newotp).Error; err == nil {
		utils.DB.Exec("DELETE FROM otptables where Email = $1", to)
	}

	//if user email exists
	//generate OTP
	otp := getToken(6)

	//save the user email and respective email id in OTP table
	newotp.Email = user.Email
	newotp.Otptoken = otp
	createOTP := utils.DB.Create(newotp)

	if createOTP.Error != nil {
		err := map[string]interface{}{"status": false, "message": createOTP.Error}
		json.NewEncoder(w).Encode(err)
		return
	} else {
		//send email to user email id with otp
		// sender data
		from := os.Getenv("FromEmailAddr")
		password := os.Getenv("SMTPpwd")
		// receiver address
		//toEmail := os.Getenv("ToEmailAddr")
		//to := []string{toEmail}
		// smtp - Simple Mail Transfer Protocol
		host := "smtp.mail.yahoo.com"
		port := "587"
		address := host + ":" + port
		// message
		subject := "Reset password OTP - reitz Union Hotel\n"
		body := "Dear Customer,Your request for reset password has been received!Your otp to reset the password is:"
		body = body + otp
		message := []byte(subject + body)
		// athentication data
		// func PlainAuth(identity, username, password, host string) Auth
		auth := smtp.PlainAuth("", from, password, host)
		// send mail
		// func SendMail(addr string, a Auth, from string, to []string, msg []byte) error
		fmt.Println(otp)
		error := smtp.SendMail(address, auth, from, to, message)
		if error != nil {
			fmt.Println("error:", error)
			return
		}
		var resp = map[string]interface{}{"message": "successfully got the emailid"}
		json.NewEncoder(w).Encode(resp)
	}
}
