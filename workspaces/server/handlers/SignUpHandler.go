package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"server/utils"

	"golang.org/x/crypto/bcrypt"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	json.NewDecoder(r.Body).Decode(user)
	existsOrNot := utils.DB.First(&user, "email = ?", user.Email)
	if existsOrNot.RowsAffected != 0 {
		var resp = map[string]interface{}{"message": "Email ID Already exists"}
		json.NewEncoder(w).Encode(resp)
		return

	}

	pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
		err := models.ErrorResponse{
			Err: "Password Encryption  failed",
		}
		json.NewEncoder(w).Encode(err)
	}

	user.Password = string(pass)

	createdUser := utils.DB.Create(user)

	if createdUser.Error != nil {

		json.NewEncoder(w).Encode(err)
		return
	} else {
		var success = map[string]interface{}{"message": "Success"}
		json.NewEncoder(w).Encode(success)
		return
	}

}
