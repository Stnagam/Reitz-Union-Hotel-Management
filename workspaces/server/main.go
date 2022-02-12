package main

import (
	"log"
	"net/http"
	"server/helpers"

	"github.com/gorilla/mux"
)

func initializeRouter() {
	r := mux.NewRouter()

	r.HandleFunc("/users", helpers.GetUsers).Methods("GET")
	r.HandleFunc("/users/{email}", helpers.GetUser).Methods("GET")

	r.HandleFunc("/users", helpers.CreateUser).Methods("POST")

	//helpers.LoginVerifierfnc("sheelaippili@gmail.com", "sshh@21")
	r.HandleFunc("/users/{id}", helpers.UpdateUser).Methods("PUT")
	r.HandleFunc("/users/{id}", helpers.DeleteUser).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":9000", r))
}

func main() {
	helpers.MailHelper()
	helpers.InitialMigration()
	initializeRouter()

}
