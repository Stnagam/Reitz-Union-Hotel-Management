package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func AssignReqs(w http.ResponseWriter, r *http.Request) {
	incomingCR := &models.CustomerRequest{}
	utils.DB.Model(&models.CustomerRequest{}).Where("RequestID = ?", incomingCR.RequestID).Update("Status", "Assigned")
	var resp = map[string]interface{}{"message": "Request Status Changed to Assigned"}
	json.NewEncoder(w).Encode(resp)

}
func MarkCompleted(w http.ResponseWriter, r *http.Request) {

}
