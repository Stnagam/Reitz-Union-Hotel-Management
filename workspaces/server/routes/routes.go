package routes

import (
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

	s.HandleFunc("/logout", handlers.LogoutHandler).Methods("POST")
	s.HandleFunc("/otpgeneration", handlers.OTPGenerationHandler).Methods("POST")
	s.HandleFunc("/forgotpassword", handlers.ForgotPasswordHandler).Methods("POST")
	s.HandleFunc("/availablerooms", handlers.AvailableRoomsHandler).Methods("GET")
	s.HandleFunc("/bookings", handlers.BookingHandler).Methods("POST")
	s.HandleFunc("/customerReqs", handlers.CustomerReqs).Methods("POST")
	s.HandleFunc("/pendingReqs", handlers.GetPendingReqs).Methods("GET")
	s.HandleFunc("/assignedReqs", handlers.GetAssignedReqs).Methods("GET")
	s.HandleFunc("/completedReqs", handlers.GetCompletedReqs).Methods("GET")
	s.HandleFunc("/assignReqsToEmp", handlers.AssignReqs).Methods("POST")
	s.HandleFunc("/markComplete", handlers.MarkCompleted).Methods("POST")
	s.HandleFunc("/deleteCompleted", handlers.DeleteCompleted).Methods("POST")

	cors(s)
	log.Fatal(http.ListenAndServe(":8080", cors(router)))

}
