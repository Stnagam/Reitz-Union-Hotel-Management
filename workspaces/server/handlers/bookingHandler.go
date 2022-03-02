package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"server/models"
	"server/constants"
)

func BookingHandler(w http.ResponseWriter, r *http.Request) {
currBooking := &models.Booking{}
	 json.NewDecoder(r.Body).Decode(currBooking)
	 



}


func BookingIDGen (n int) string{

	 b := make([]byte, n)
    for i := range b {
        b[i] = constants.LetterBytes[rand.Intn(len(constants.LetterBytes))]
    }
    return string(b)
}



