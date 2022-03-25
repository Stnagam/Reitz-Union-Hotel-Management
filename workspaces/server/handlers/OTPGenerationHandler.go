package handlers

import (
	"crypto/rand"
	"encoding/base32"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"server/models"
	"server/utils"

	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
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
		err := godotenv.Load()
		if err != nil {
			panic("Error loading .env file")
		}
		msg := gomail.NewMessage()
		msg.SetHeader("From", os.Getenv("FROMEMAILADDRESS"))
		msg.SetHeader("To", user.Email)
		msg.SetHeader("Subject", "OTP to reset password- Reitz Union Hotel")
		msg.SetBody("text/html", "Dear Customer,<br><br>Your request for reset password has been received!<br><br>Your otp to reset the password is: "+otp)

		n := gomail.NewDialer("smtp.mail.yahoo.com", 587, os.Getenv("FROMEMAILADDRESS"), os.Getenv("SMTPPASSWORD"))
		// Send the email
		if err := n.DialAndSend(msg); err != nil {
			fmt.Println("error:", err)
		} else {
			var resp = map[string]interface{}{"message": "successfully got the emailid"}
			json.NewEncoder(w).Encode(resp)
		}

	}
}
