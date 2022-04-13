package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func GetFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	//decode the json request to check availability of rooms
	currFeedback := &models.Feedback{}
	err := json.NewDecoder(r.Body).Decode(currFeedback)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	} else {
		utils.DB.Create(currFeedback)
		var resp = map[string]interface{}{"message": "feedback logged successfully"}
		json.NewEncoder(w).Encode(resp)
		return
	}
}

func ViewFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	var allFeedbacks []models.Feedback
	utils.DB.Find(&allFeedbacks)
	json.NewEncoder(w).Encode(&allFeedbacks)
}
