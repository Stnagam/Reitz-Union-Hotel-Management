package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

func TestBookingHandler(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"bookingID" : "",
		"roomID" : null,
		"typeOfRoom" : "deluxe",
		"noOfRoomsToBook" : 1,
		"email" : "sheelaippili140@gmail.com",
		"noOfGuests" : 2,
		"noOfChildren" : 0,
		"checkInDummy" : "2022-05-01",
		"checkOutDummy" : "2022-05-06",
		"checkin" : null,
		"checkout" : null,
		"amount" : "2000$",
		"paymentStatus" : "true",
		"reserveRooms" : "115"
	}`)

	req, err := http.NewRequest("POST", "/auth/bookings", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(BookingHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `"paymentStatus":"true"`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestBookingHandlerPaymentFailed(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"bookingID" : "",
		"roomID" : null,
		"typeOfRoom" : "deluxe",
		"noOfRoomsToBook" : 3,
		"email" : "sheelaippili140@gmail.com",
		"noOfGuests" : 6,
		"noOfChildren" : 3,
		"checkInDummy" : "2022-04-01",
		"checkOutDummy" : "2022-04-06",
		"checkin" : null,
		"checkout" : null,
		"amount" : "600$",
		"paymentStatus" : "false",
		"reserveRooms" : "111,102,103,111,112,113"
	}`)

	req, err := http.NewRequest("POST", "/auth/bookings", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(BookingHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Payment Failed"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestBookingHandlerInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"bookingID" : ""
		"roomID" : null
		"typeOfRoom" : "executive"
		"noOfRoomsToBook" : 3,
		"email" : "sheelaippili140@gmail.com",
		"noOfGuests" : 6,
		"noOfChildren" : 3,
		"checkInDummy" : "2022-09-01",
		"checkOutDummy" : "2022-09-06",
		"checkin" : null,
		"checkout" : null,
		"amount" : "600$",
		"paymentStatus" : "true",
		"reserveRooms" : "101,102,103,111,112,113"
	}`)

	req, err := http.NewRequest("POST", "/auth/bookings", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(BookingHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Invalid json request","status":false}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
