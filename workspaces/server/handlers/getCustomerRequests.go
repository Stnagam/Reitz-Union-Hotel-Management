package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func GetPendingReqs(w http.ResponseWriter, r *http.Request) {
	incomingCR := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(incomingCR)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	var allRequests []models.CustomerRequest

	utils.DB.Where("status = ?", "Pending").Find(&allRequests)

	json.NewEncoder(w).Encode(&allRequests)

}

func GetAssignedReqs(w http.ResponseWriter, r *http.Request) {
	incomingCR := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(incomingCR)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	var allRequests []models.CustomerRequest

	utils.DB.Where("status = ?", "Assigned").Find(&allRequests)

	json.NewEncoder(w).Encode(&allRequests)

}
func GetCompletedReqs(w http.ResponseWriter, r *http.Request) {
	incomingCR := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(incomingCR)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	var allRequests []models.CustomerRequest

	utils.DB.Where("status = ?", "Completed").Find(&allRequests)

	json.NewEncoder(w).Encode(&allRequests)

}
