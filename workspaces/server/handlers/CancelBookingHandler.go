package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
)

func CancelBookingHandler(w http.ResponseWriter, r *http.Request) {

	//decode the json request to check availability of rooms
	currRequest := &models.Booking{}
	err := json.NewDecoder(r.Body).Decode(currRequest)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	bookingsInTable := &models.Booking{}
	result := utils.DB.Where("booking_id = ? and Email = ?", currRequest.BookingID, currRequest.Email).First(bookingsInTable)
	if result.RowsAffected == 0 {
		var resp = map[string]interface{}{"status": false, "message": "There is no booking with the specified booking id"}
		json.NewEncoder(w).Encode(resp)
		return
	} else if err := utils.DB.Where("booking_id = ? and Email = ?", currRequest.BookingID, currRequest.Email).First(bookingsInTable).Error; err == nil {
		utils.DB.Exec("DELETE FROM bookings where booking_id = $1 AND Email = $2", currRequest.BookingID, currRequest.Email)
		var success = map[string]interface{}{"message": "Cancellled the booking successfully"}
		json.NewEncoder(w).Encode(success)
		return
	} else {
		var resp = map[string]interface{}{"status": false, "message": "Could not cancel the booking. Please try again"}
		json.NewEncoder(w).Encode(resp)
		return
	}

}
