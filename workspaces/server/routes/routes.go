package routes

import (
	"log"
	"net/http"
	"server/handlers"

	"github.com/gorilla/mux"
)

func Controller() {
	router := mux.NewRouter()

	router.HandleFunc("/signup", handlers.SignUpHandler).Methods("POST")
	router.HandleFunc("/login", handlers.LoginHandler).Methods("POST")
	//router.HandleFunc("/forgotpassword", handlers.ForgotPasswordHandler).Methods("POST")
	log.Fatal(http.ListenAndServe(":8000", router))
}
