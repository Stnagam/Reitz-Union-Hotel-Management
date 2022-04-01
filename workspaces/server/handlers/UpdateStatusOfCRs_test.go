package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

func TestUpdateStatus(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{

   "requestID" : "000111112"  ,
   "employeeID" : "1234",
    "roomNumber" : 101,
    "email" : "saitejanagam@gmail.com",
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"

	}`)

	req, err := http.NewRequest("POST", "/auth/assignReqsToEmp", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AssignReqs)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Request Status Changed to Assigned"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestUpdateStatusInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"requestID" : "2323242424"
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
	handler := http.HandlerFunc(AssignReqs)
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

func TestUpdateStatusMarkComplete(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{

   "requestID" : "000111112"  ,
   "employeeID" : "1234",
    "roomNumber" : 101,
    "email" : "saitejanagam@gmail.com",
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"

	}`)

	req, err := http.NewRequest("POST", "/auth/markComplete", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(MarkCompleted)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Request Status Changed to Completed"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestUpdateStatusMarkCompleteInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"requestID" : "2323242424"
   "employeeID" : ""
    "roomNumber" : 101
    "email" : "saitejanagam@gmail.com"
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"
	}`)

	req, err := http.NewRequest("POST", "/auth/markComplete", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(MarkCompleted)
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

func TestUpdateStatusDeleteCompleted(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{

   "requestID" : "000111112"  ,
   "employeeID" : "1234",
    "roomNumber" : 101,
    "email" : "saitejanagam@gmail.com",
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"

	}`)

	req, err := http.NewRequest("POST", "/auth/deleteCompleted", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(DeleteCompleted)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Request has been deleted"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestUpdateStatusDeleteCompletedInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"requestID" : "2323242424"
   "employeeID" : ""
    "roomNumber" : 101
    "email" : "saitejanagam@gmail.com"
    "requestType": "cleaning",
    "comment": "Please clean the room",
    "status": "Pending"
	}`)

	req, err := http.NewRequest("POST", "/auth/deleteCompleted", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(DeleteCompleted)
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
