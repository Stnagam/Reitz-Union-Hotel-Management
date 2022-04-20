package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/utils"
	"strings"
	"testing"
)

func TestFeedbackHandler(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"email" : "sheelaippili140@gmail.com",
		"feedbackform" : "I had an amazing stay"
	}`)

	req, err := http.NewRequest("POST", "/auth/getfeedback", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetFeedbackHandler)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"message":"feedback logged successfully"}`
	if strings.Contains(rr.Body.String(), expected) {
	} else {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestFeedbackHandlerInvalidRequest(t *testing.T) {
	//use mock db database name in .env file
	utils.DBConnection()

	var jsonStr = []byte(`{
		"email" : "sheelaippili140@gmail.com"
		"feedbackform" : "I had an amazing stay"
	}`)

	req, err := http.NewRequest("POST", "/auth/getfeedback", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetFeedbackHandler)
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
