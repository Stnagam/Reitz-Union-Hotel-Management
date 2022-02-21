package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func ToJson(response interface{}) []byte {
	json, err := json.MarshalIndent(response, "", "\t")
	if err != nil {
		return nil
	}
	return json
}

func ParseRequestBody(request *http.Request, ref interface{}) {
	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		fmt.Println("body parse failed")
	}
	json.Unmarshal(body, &ref)
}

func WriteJsonResponse(writer http.ResponseWriter, status int, jsonResponse []byte) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	writer.Write(jsonResponse)
}
