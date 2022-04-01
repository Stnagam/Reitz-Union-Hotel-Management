package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

//valid test
func TestAvailableRoomsHandler(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"bookingID" : "",
		"roomID" : null,
		"email" : "sheelaippili140@gmail.com",
		"noOfGuests" : 10,
		"noOfChildren" : 0,
		"checkInDummy" : "2022-12-01",
		"checkOutDummy" : "2022-12-30",
		"checkin" : null,
		"checkout" : null,
		"amount" : "",
		"paymentStatus" : ""
	}`)

	req, err := http.NewRequest("POST", "/auth/availablerooms", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AvailableRoomsHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `"message":"Rooms are available in the defined checkin-checkout dates"`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

//invalid json request test
func TestAvailableRoomsHandlerInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr1 = []byte(`{
		"bookingID" : ""
		"roomID" : null
		"email" : "sheelaippili140@gmail.com",
		"noOfGuests" : 20,
		"noOfChildren" : 0,
		"checkInDummy" : "2022-04-01",
		"checkOutDummy" : "2022-04-30",
		"checkin" : null,
		"checkout" : null,
		"amount" : "",
		"paymentStatus" : ""
	}`)

	req, err := http.NewRequest("POST", "/auth/availablerooms", bytes.NewBuffer(jsonStr1))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AvailableRoomsHandler)
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

//no rooms available in selected checkin checkout dates test
func TestAvailableRoomsHandlerNoRoomsAvailable(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr1 = []byte(`{
		"bookingID" : "",
		"roomID" : null,
		"email" : "sheelaippili140@gmail.com",
		"noOfGuests" : 20,
		"noOfChildren" : 0,
		"checkInDummy" : "2022-04-01",
		"checkOutDummy" : "2022-04-06",
		"checkin" : null,
		"checkout" : null,
		"amount" : "",
		"paymentStatus" : ""
	}`)

	req, err := http.NewRequest("POST", "/auth/availablerooms", bytes.NewBuffer(jsonStr1))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AvailableRoomsHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"no rooms available in the specified time period","status":false}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
