package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func GetPendingReqs(w http.ResponseWriter, r *http.Request) {

	var allRequests []models.CustomerRequest
	utils.DB.Where("status = ?", "Pending").Find(&allRequests)
	json.NewEncoder(w).Encode(&allRequests)

}

func GetAssignedReqs(w http.ResponseWriter, r *http.Request) {
	var allRequests []models.CustomerRequest
	utils.DB.Where("status = ?", "Assigned").Find(&allRequests)
	json.NewEncoder(w).Encode(&allRequests)

}
func GetCompletedReqs(w http.ResponseWriter, r *http.Request) {
	var allRequests []models.CustomerRequest
	utils.DB.Where("status = ?", "Completed").Find(&allRequests)
	json.NewEncoder(w).Encode(&allRequests)

}
