package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func AssignReqs(w http.ResponseWriter, r *http.Request) {

	incomingCR := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(incomingCR)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	json.NewDecoder(r.Body).Decode(incomingCR)
	utils.DB.Model(&models.CustomerRequest{}).Where("request_id = ?", incomingCR.RequestID).Update("status", "Assigned")
	utils.DB.Model(&models.CustomerRequest{}).Where("request_id = ?", incomingCR.RequestID).Update("employeeID", incomingCR.EmployeeID)
	var resp = map[string]interface{}{"message": "Request Status Changed to Assigned"}
	json.NewEncoder(w).Encode(resp)

}
func MarkCompleted(w http.ResponseWriter, r *http.Request) {
	incomingCR := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(incomingCR)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	json.NewDecoder(r.Body).Decode(incomingCR)
	utils.DB.Model(&models.CustomerRequest{}).Where("request_id = ?", incomingCR.RequestID).Update("status", "Completed")

	var resp = map[string]interface{}{"message": "Request Status Changed to Completed"}
	json.NewEncoder(w).Encode(resp)

}
func DeleteCompleted(w http.ResponseWriter, r *http.Request) {
	incomingCR := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(incomingCR)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	json.NewDecoder(r.Body).Decode(incomingCR)
	utils.DB.Where("request_id = ?", incomingCR.RequestID).Delete(&models.CustomerRequest{})
	var resp = map[string]interface{}{"message": "Request has been deleted"}
	json.NewEncoder(w).Encode(resp)

}
