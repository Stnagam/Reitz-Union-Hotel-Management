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

func BookingHandler(w http.ResponseWriter, r *http.Request) {
	currBooking := &models.Booking{}

	//check if the json request sent is a valid request or not
	err := json.NewDecoder(r.Body).Decode(currBooking)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	//if its not a successful booking, then send a json request stating the payment failed
	if currBooking.PaymentStatus == "false" {
		var resp = map[string]interface{}{"message": "Payment Failed"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	//if its a succesful payment request
	if currBooking.PaymentStatus == "true" {
		//currBooking.BookingID, err = BookingIDGen(12)
		data := "dummySECRETdummy"
		secret := string(data)
		id := BookingIDGen(secret)
		currBooking.BookingID = id
		//var eachRoom uint
		//save booking info with room room info in the booking table database
		//assign rooms to the booking (each booking id can have multiple rooms assigned to it)
		if err == nil {
			perRoom := strings.Split(currBooking.ReserveRooms, ",")
			for _, value := range perRoom {
				eachRoom, err := strconv.ParseUint(value, 10, 64)
				if err == nil {
					currBooking.RoomID = uint(eachRoom)
					//fmt.Println(currBooking.BookingID)
					//fmt.Println(currBooking.RoomID)
					utils.DB.Create(currBooking)
				}
			}
			ConfirmationEmailHandler(currBooking.Email, currBooking.BookingID)
			json.NewEncoder(w).Encode(currBooking)
			return
		}
	}
}

//Panic if error is not nil
func check(e error) {
	if e != nil {
		//fmt.Println(e)
		panic(e)
	}
}

//Append extra 0s if the length of otp is less than 6
//If otp is "1234", it will return it as "001234"
func prefix0(otp string) string {
	if len(otp) == 6 {
		return otp
	}
	for i := (6 - len(otp)); i > 0; i-- {
		otp = "0" + otp
	}
	return otp
}

func getHOTPToken(secret string, interval int64) string {

	//Converts secret to base32 Encoding. Base32 encoding desires a 32-character
	//subset of the twenty-six letters A–Z and ten digits 0–9
	key, err := base32.StdEncoding.DecodeString(strings.ToUpper(secret))
	check(err)
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

	check(err)
	//Ignore most significant bits as per RFC 4226.
	//Takes division from one million to generate a remainder less than < 7 digits
	h12 := (int(header) & 0x7fffffff) % 1000000

	//Converts number as a string
	otp := strconv.Itoa(int(h12))
	return prefix0(otp)
}

func BookingIDGen(secret string) string {
	//The TOTP token is just a HOTP token seeded with every 30 seconds.
	interval := time.Now().Unix() / 120
	return getHOTPToken(secret, interval)
}
