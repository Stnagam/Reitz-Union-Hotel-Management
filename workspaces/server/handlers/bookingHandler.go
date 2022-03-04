package handlers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"server/constants"
	"server/utils"

	//	"server/utils"

	"server/models"
)

func BookingHandler(w http.ResponseWriter, r *http.Request) {
	currBooking := &models.Booking{}
	json.NewDecoder(r.Body).Decode(currBooking)
	fmt.Println(currBooking.BookingID)
	fmt.Println(currBooking.CheckIn)

	if currBooking.PaymentStatus == "false" {
		var resp = map[string]interface{}{"message": "Payment Failed"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	if currBooking.PaymentStatus == "true" {

		currBooking.BookingID = BookingIDGen(10)
		utils.DB.Create(currBooking)
		json.NewEncoder(w).Encode(currBooking)
		return

	}

}

func BookingIDGen(n int) string {

	b := make([]byte, n)
	for i := range b {
		b[i] = constants.LetterBytes[rand.Intn(len(constants.LetterBytes))]
	}
	fmt.Println(string(b))
	return string(b)
}
