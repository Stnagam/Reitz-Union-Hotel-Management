package helpers

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

type emailResult struct {
	Email    string
	Password string
}

func LoginVerifierfnc(emailToVerify string, passwordToVerify string) (res bool) {
	//get password from DB

	var result emailResult

	DB.Table("users").Select("email", "password").Where("email = ?", emailToVerify).Scan(&result)

	if err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(passwordToVerify)); err != nil {
		// TODO: Properly handle error
		fmt.Println("login failed!")

		log.Fatal(err)
		return false
	}
	//	fmt.Println(result.Password)
	//	fmt.Println("login Succesful!")
	return true
}
