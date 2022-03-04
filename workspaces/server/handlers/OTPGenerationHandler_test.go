package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

func TestOTPGenerationHandler(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{"email":"sheelaippili@ufl.edu"}`)

	req, err := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(OTPGenerationHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"successfully got the emailid"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestOTPGenerationHandlerNoEmail(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{"email":"sheelali9714@gmail.com"}`)

	req, err := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(OTPGenerationHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Email address not found","status":false}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestOTPGenerationHandlerInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{"email":"sheelali9714@gmail.com", ""}`)

	req, err := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(OTPGenerationHandler)
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
