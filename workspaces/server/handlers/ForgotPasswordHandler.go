package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"server/utils"

	"golang.org/x/crypto/bcrypt"
)

func ForgotPasswordHandler(w http.ResponseWriter, r *http.Request) {
	//get emailid of user
	resetpass := &models.Resetpassword{}
	err := json.NewDecoder(r.Body).Decode(resetpass)
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	//check if the otp entered by user and otp in database match or not
	user := &models.User{}
	newotp := &models.Otptable{}
	if err := utils.DB.Where("Email = ? AND Otptoken = ?", resetpass.Email, resetpass.Otptoken).First(newotp).Error; err != nil {
		var resp = map[string]interface{}{"status": false, "message": "no otp record for specified user"}
		json.NewEncoder(w).Encode(resp)
		return
	} else {
		//if they match
		//get new password and hash it
		pass, err := bcrypt.GenerateFromPassword([]byte(resetpass.Password), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println(err)
			err := models.ErrorResponse{
				Err: "Password Encryption failed",
			}
			json.NewEncoder(w).Encode(err)
		}
		//update the current users password
		updatedUser := utils.DB.Model(&user).Where("Email = ?", resetpass.Email).Update("Password", pass)
		if updatedUser.Error != nil {
			json.NewEncoder(w).Encode(err)
			return
		} else {
			utils.DB.Exec("DELETE FROM otptables where Email = $1", resetpass.Email)
			var success = map[string]interface{}{"message": "Password changed successfully"}
			json.NewEncoder(w).Encode(success)
			return
		}
	}

}
