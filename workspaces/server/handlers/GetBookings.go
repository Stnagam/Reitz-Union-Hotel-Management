package handlers

import (
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
	"time"
)

func GetBookings(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	json.NewDecoder(r.Body).Decode(user)
	incomingEmail := user.Email

	var UpcomingBookings []models.Booking
	utils.DB.Where("email = ? AND check_in >= ? ", incomingEmail, time.Now()).Find(&UpcomingBookings)
	var PastBookings []models.Booking
	utils.DB.Where("email = ?  AND check_out < ?", incomingEmail, time.Now()).Find(&PastBookings)

	var resp = map[string]interface{}{"UpcomingBookings": UpcomingBookings, "PastBookings": PastBookings}
	json.NewEncoder(w).Encode(resp)

}
