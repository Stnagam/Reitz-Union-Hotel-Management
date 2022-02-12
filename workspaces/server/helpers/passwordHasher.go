package helpers

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func passwordHasher(inputString string) (result string) {
	userPassword1 := inputString

	// Generate "hash" to store from user password
	hash, err := bcrypt.GenerateFromPassword([]byte(userPassword1), 10)
	if err != nil {
		// TODO: Properly handle error
		log.Fatal(err)
	}
	res := string(hash)

	return res

}
