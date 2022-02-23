package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"server/utils"

	"golang.org/x/crypto/bcrypt"
)

// func SignUpHandler(w http.ResponseWriter, r *http.Request) {

// 	user := &models.User{}
//   err :=	json.NewDecode(r.Body).Decode(user)

// 	pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
// 	if err != nil {

// 		log.Fatal(err)

// 		fmt.Print("errrorr")
// 	}
// 	i err == nil {
// 		user.Password  string(pass)

// 		json.NewEncoder(w).Encode(createdUse)

// 	}

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	json.NewDecoder(r.Body).Decode(user)

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
	var errMessage = createdUser.Error

	if createdUser.Error != nil {
		fmt.Println(errMessage)
		json.NewEncoder(w).Encode(err)
		return
	}
	json.NewEncoder(w).Encode(createdUser)
}
