package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"server/constants"
	"server/models"
	"server/utils"
)

func CustomerReqs(w http.ResponseWriter, r *http.Request) {
	IncomingReq := &models.CustomerRequest{}
	json.NewDecoder(r.Body).Decode(IncomingReq)
	IncomingReq.RequestID = RequestIDGen(13)
	utils.DB.Create(IncomingReq)
	var resp = map[string]interface{}{"message": "Request Raised"}
	json.NewEncoder(w).Encode(resp)

}

func RequestIDGen(n int) string {

	b := make([]byte, n)
	for i := range b {
		b[i] = constants.LetterBytes[rand.Intn(len(constants.LetterBytes))]
	}

	return string(b)
}
