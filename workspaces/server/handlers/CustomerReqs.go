package handlers

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha1"
	"encoding/base32"
	"encoding/binary"
	"encoding/json"
	"net/http"
	"server/models"
	"server/utils"
	"strconv"
	"strings"
	"time"
)

func CustomerReqs(w http.ResponseWriter, r *http.Request) {
	IncomingReq := &models.CustomerRequest{}
	err := json.NewDecoder(r.Body).Decode(IncomingReq)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	json.NewDecoder(r.Body).Decode(IncomingReq)
	data := "dummySECRETdummy"
	secret := string(data)
	IncomingReq.RequestID = RequestIDGen(secret)
	utils.DB.Create(IncomingReq)
	var resp = map[string]interface{}{"message": "Request Raised"}
	json.NewEncoder(w).Encode(resp)

}

//Panic if error is not nil
func checkForError(e error) {
	if e != nil {
		panic(e)
	}
}

//Append extra 0s if the length of otp is less than 6
//If otp is "1234", it will return it as "001234"
func prefixZeros(otp string) string {
	if len(otp) == 12 {
		return otp
	}
	for i := (12 - len(otp)); i > 0; i-- {
		otp = "0" + otp
	}
	return otp
}

func getTokenForCRs(secret string, interval int64) string {

	//Converts secret to base32 Encoding. Base32 encoding desires a 32-character
	//subset of the twenty-six letters A–Z and ten digits 0–9
	key, err := base32.StdEncoding.DecodeString(strings.ToUpper(secret))
	checkForError(err)
	bs := make([]byte, 8)
	binary.BigEndian.PutUint64(bs, uint64(interval))

	//Signing the value using HMAC-SHA1 Algorithm
	hash := hmac.New(sha1.New, key)
	hash.Write(bs)
	h := hash.Sum(nil)

	// We're going to use a subset of the generated hash.
	// Using the last nibble (half-byte) to choose the index to start from.
	// This number is always appropriate as it's maximum decimal 15, the hash will
	// have the maximum index 19 (20 bytes of SHA1) and we need 4 bytes.
	o := (h[19] & 15)

	var header uint32
	//Get 32 bit chunk from hash starting at the o
	r := bytes.NewReader(h[o : o+4])
	err = binary.Read(r, binary.BigEndian, &header)

	checkForError(err)
	//Ignore most significant bits as per RFC 4226.
	//Takes division from one million to generate a remainder less than < 7 digits
	h12 := (int(header) & 0x7fffffff) % 1000000

	//Converts number as a string
	otp := strconv.Itoa(int(h12))
	return prefixZeros(otp)
}

func RequestIDGen(secret string) string {
	//The TOTP token is just a HOTP token seeded with every 05 seconds.
	interval := time.Now().Unix() / 5
	return getTokenForCRs(secret, interval)
}
