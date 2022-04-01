package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

func TestCustomerReqs(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{

   "requestID" : ""  ,
   "employeeID" : "",
    "roomNumber" : 101,
    "email" : "saitejanagam@gmail.com",
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"

	}`)

	req, err := http.NewRequest("POST", "/auth/customerReqs", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CustomerReqs)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Request Raised"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestCustomerReqsInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"requestID" : ""
   "employeeID" : ""
    "roomNumber" : 101
    "email" : "saitejanagam@gmail.com"
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"
	}`)

	req, err := http.NewRequest("POST", "/auth/customerReqs", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CustomerReqs)
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
