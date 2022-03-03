package routes

import (
	"fmt"
	"log"
	"net/http"
	"server/handlers"

	"server/utils"

	h "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func Controller() {
	router := mux.NewRouter()

	cors := h.CORS(
		h.AllowedOrigins([]string{"http://localhost:3000"}),
		h.AllowedHeaders([]string{"accept", "origin", "X-Requested-With", "x-access-token", "Content-Type", "Authorization"}),
		h.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"}),
		h.OptionStatusCode(204),
		h.AllowCredentials(),
	)

	router.HandleFunc("/signup", handlers.SignUpHandler).Methods("POST")
	router.HandleFunc("/login", handlers.LoginHandler).Methods("POST")

	s := router.PathPrefix("/auth").Subrouter()
	s.Use(utils.JwtVerify)
	//s.HandleFunc("/dummy", handlers.DummyHandler).Methods("POST")
	s.HandleFunc("/logout", handlers.LogoutHandler).Methods("POST")
	s.HandleFunc("/bookings", handlers.BookingHandler).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", cors(router)))

	fmt.Print("Server is Up!")
}
