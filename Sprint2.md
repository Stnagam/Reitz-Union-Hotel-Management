# Sprint 2 - Summary of tasks achieved

## Project - Overview

The idea is to provide a web-application to book rooms at Reitz Union hotel.

## Useful links of the project
- [Reitz-Union-Hotel-Management Repo Link](https://github.com/Stnagam/Reitz-Union-Hotel-Management) 
- [Sprint 2 User stories progress under projects](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects/2)
- [All user stories link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects/1)
- [All issues link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/issues)

## Demo links for sprint2
- End to end project Demo

- Unit tests demo


## UI Tasks achieved - (React js)
- Log in and singup page validation
- Booking page- filters for booking
- Payment page- details of card 
- Logout page
- forgot password page
- reset password page

## Backend Tasks achieved - (Go-lang)
- Created API for OTP generation, reset password
- Created a utility which sends an email for booking confirmation.
- Created unit tests for all the APIs.
- Created API for payment page.
- Updated APIs of signup, login and logout with jwt authentication


## Backend API documentation

#### SignUp API

- Allows user to signup to the website
- URL: localhost:8080/signup
- The request from front - end should contain

	    FirstName string `json:"firstname"`
	    LastName  string `json:"lastname"`
	    Email     string `gorm:"primary_key" json:"email"`
	    Password  string `json:"password"`
	    Mobile    int32  `json:"mobile"`
	    Age       int16  `json:"age"`

- Response from backend  

    If email already exists:

        `{"message":"Email ID Already exists"}`

    For successful signup:

        `{"message":"Success"}`

#### Login API

- Allows user to login to the website
- URL: localhost:8080/login
- The request from front - end should contain

	    Email     string `gorm:"primary_key" json:"email"`
	    Password  string `json:"password"`

- Response from backend  

    For invalid credentials:

        `{"message":"Invalid login credentials. Please try again"}`

    If email address is not found:

        `{"message":"Email address not found","status":false}`

    If invalid json request:

        `{"message":"Invalid request","status":false}`

    For successful login:

        `"message":"logged in"`

#### Logout API

- Allows user to logout of the website
- URL: localhost:8080/logout
- The request from front - end should contain

        Message string `json:"message"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful logout 

        {"message": "Token Has been Blacklisted"}

#### OTP Generation API

- If user requests for reset password, this API checks if the emaiid exits in the user database, generates and OTP and sends the OTP through email to the user emailid.
- URL: localhost:8080/otpgeneration
- The request from front - end should contain

	    Email string `gorm:"primary_key" json:"email"`

- Response from backend  

    If email does not exist in user table:

        `{"message":"Email address not found","status":false}`
    
    For invalid json request:

        `{"message":"Invalid json request","status":false}`
    
    For successful OTP generation and email :

        `{"message":"successfully got the emailid"}`

#### Reset Password API

- If user requests for reset password, this API checks if the otp entered is correct, then updates the password of the user with new password.
- URL: localhost:8080/forgotpassword
- The request from front - end should contain

	    Email    string `gorm:"primary_key" json:"email"`
	    Password string `json:"password"`
	    Otptoken string `json:"otptgen"`

- Response from backend  

    If OTP is not correct for the user :

        `{"message":"no otp record for specified user","status":false}`
    
    For invalid json request

        `{"message":"Invalid request","status":false}`

    For successful rest password 

        `{"message":"Password changed successfully"}`




