package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request) {

	IncomingMessage := &models.Exception{}
	err := json.NewDecoder(r.Body).Decode(IncomingMessage)
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	if IncomingMessage.Message == "kill token" {
		var resp = map[string]interface{}{"message": "Token Has been Blacklisted"}
		json.NewEncoder(w).Encode(resp)
		return
	}

}
