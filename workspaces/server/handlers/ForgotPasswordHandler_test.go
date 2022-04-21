package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

func TestForgotPasswordHandler(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr1 = []byte(`{"email":"sheelaippili9714@gmail.com","password":"newuser@123456","otptoken":"5NX6RL"}`)

	req, err := http.NewRequest("POST", "/forgotpassword", bytes.NewBuffer(jsonStr1))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(ForgotPasswordHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Password changed successfully"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestForgotPasswordHandlerNoOtp(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr1 = []byte(`{"email":"sheelaippili@ufl.edu","password":"usheelanew@ufl","otptoken":"tyufg"}`)

	req, err := http.NewRequest("POST", "/forgotpassword", bytes.NewBuffer(jsonStr1))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(ForgotPasswordHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"no otp record for specified user","status":false}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestForgotPasswordHandlerInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr1 = []byte(`{"email":"newuser6@gmail.com","password":"user6@123","otptoken":"tyufg",""}`)

	req, err := http.NewRequest("POST", "/forgotpassword", bytes.NewBuffer(jsonStr1))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(ForgotPasswordHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"Invalid request","status":false}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
