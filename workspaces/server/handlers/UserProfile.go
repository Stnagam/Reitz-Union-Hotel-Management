package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func GetUserDetails(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	json.NewDecoder(r.Body).Decode(user)
	existsOrNot := utils.DB.First(&user, "email = ?", user.Email)
	if existsOrNot.RowsAffected != 0 {

		json.NewEncoder(w).Encode(user)
		return

	} else {
		var resp = map[string]interface{}{"message": "Email ID doesn't exists"}
		json.NewEncoder(w).Encode(resp)
		return
	}

}
