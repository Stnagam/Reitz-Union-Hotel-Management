package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
)
func LogoutHandler(w http.ResponseWriter, r *http.Request){

	 	user := &models.User{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	

}