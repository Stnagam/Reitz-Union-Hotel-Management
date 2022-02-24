package routes

import (
	"fmt"
	"log"
	"net/http"
	"server/handlers"

	//"server/utils"

	"github.com/gorilla/mux"
)

func Controller() {
	router := mux.NewRouter()

	router.HandleFunc("/signup", handlers.SignUpHandler).Methods("POST")
	router.HandleFunc("/login", handlers.LoginHandler).Methods("POST")
	router.HandleFunc("/logout", handlers.LogoutHandler).Methods("POST")
	//router.HandleFunc("/forgotpassword", handlers.ForgotPasswordHandler).Methods("POST")
	// Auth route
	// s := router.PathPrefix("/auth").Subrouter()
	// s.Use(auth.utils.JwtVerify())
	// s.HandleFunc("/logout", handlers.LoginHandler).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", router))
	fmt.Print("Server is Up!")
}
