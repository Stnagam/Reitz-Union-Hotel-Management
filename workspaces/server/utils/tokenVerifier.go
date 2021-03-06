package utils

import (
	"context"
	"encoding/json"
	"net/http"
	"server/models"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

//Exception struct
type Exception models.Exception

// JwtVerify Middleware function
func JwtVerify(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		var header = r.Header.Get("x-access-token") //Grab the token from the header

		header = strings.TrimSpace(header)

		if header == "" {
			//Token is missing, returns with error code 403 Unauthorized
			w.WriteHeader(http.StatusForbidden)
			var resp = map[string]interface{}{"message": "Illegal Token"}
			json.NewEncoder(w).Encode(resp)
			//	json.NewEncoder(w).Encode(Exception{Message: "Missing auth token"})
			return
		}
		tk := &models.Token{}

		_, err := jwt.ParseWithClaims(header, tk, func(token *jwt.Token) (interface{}, error) {
			return []byte("secret"), nil
		})

		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			var resp = map[string]interface{}{"message": "Token has been compromised"}
			json.NewEncoder(w).Encode(resp)
			return
		}
		// var success = map[string]interface{}{"message": "Success"}
		// json.NewEncoder(w).Encode(success)

		ctx := context.WithValue(r.Context(), "user", tk)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
