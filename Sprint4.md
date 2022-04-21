# Sprint 4 - Summary of tasks achieved

## Description of your application - 200 words max
- We have built a Reitz Union Hotel Management System that helps customers, Hotel Manager/Admin and Hotel employees. 
- The main idea is to provide a web-application to book rooms at Reitz Union hotel.
- We have built an Admin portal, Provided functionality to raise requests and to assign requests, manage requests. 
- We have created LOGIN, SIGNUP, user bookings page, view bookings, and profile page. 

#### Technical Infrastructure leveraged in this project
- ReactJs for frontend 
- GORM for persistance framework in GoLang
- GORILLA/MUX for webservice framework in GoLang
- CYPRESS/JEST for unit testing
- PostgreSQL as DB
- Git Hub as remote repository 

#### The functionalities our application provides are as follows:

- *Register*  *Login*  *Book rooms* *Raise Requests* *Manage requests* *Email notifications* 
- *Display Bookings page* *Reset Password* *Update Profile* 

## Team members
#### Frontend
- Hetansh Narendrabhai Patel (57360378)
- Harsha Prakash Pakki (51953042)
#### Backend
- Sai Teja Nagam (21193702)
- Sheela Rani Ippili (29950862)

## Useful links of the project
- [Reitz-Union-Hotel-Management Repo Link](https://github.com/Stnagam/Reitz-Union-Hotel-Management) 
- [All user stories link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects/1)
- [All issues link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects)
- [Project board link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects/5)


## How to run the project

#### Backend
- execute roomData.sql to load room information into rooms table.
- create .env file with environment variables.
- Go to server folder and run the command `go run main.go` to start the server.

#### Frontend
- go to client folder and run the command `npm start` to start the client

## UI Tasks achieved - (React js)
- get feedback page
- view feedback page
- cancel bookings page
- integration of front end and backend
- cypress tests

## Backend Tasks achieved - (Golang)
- API for receiving feedback from a specific user
- API to view all the feedback received so far by the admin
- API to cancel a booking for a specific user
- API for getting user details (for profile page)
- API for getting upcoming and past booking details for a specific user
- API for updating mobile number for specific user

## Backend API documentation

####  Cancel Bookings API

- deletes a booking.
- URL: localhost:8080/deleteCompleted
- The request from front - end should contain


        Email       string `json:"email"`
        BookingID       string    `gorm:"primary_key"  json:"bookingID"`

- Response from backend  

    If invalid json request

        {"status": false, "message": "Invalid json request"}

    If no there is no booking with the specified booking id

        {"status": false, "message": "There is no booking with the specified booking id"}

    For successful request 

        {"message": "Cancellled the booking successfully"}

####  Get Feedback API

- gets the feedback of a user and stores the feedback for a user.
- URL: localhost:8080/getfeedback
- The request from front - end should contain

	    Email        string `json:"email"`
	    FeedbackForm string `json:"feedbackform"`

- Response from backend  

    If invalid json request

        {"status": false, "message": "Invalid json request"}

    For successful request 

        {"message": "feedback logged successfully"}

####  View Feedback API

- The admin can view all the feedbacks received so far.
- URL: localhost:8080/viewfeedback
- The request from front - end should contain

	    Email        string `json:"email"`

- Response from backend  

    For successful request 

        returns all the feedbacks received so far.

####  Get Booking details API

- Displays the past bookings and upcoming bookings details.
- URL: localhost:8080/getBookings
- The request from front - end should contain

	    Email        string `json:"email"`

- Response from backend  

    For successful request 

        returns all the upcoming and past booking details in the json.

####  Get User details API

- Displays the details of the specific user
- URL: localhost:8080/getUserDetails
- The request from front - end should contain

	    Email        string `json:"email"`

- Response from backend  

    If email id does not exist 

        {"status": false, "message": "Email id doesnt exist"}

    For successful request


####  Update user phone number API

- updates the mobile number of the specific user
- URL: localhost:8080/updateMobile
- The request from front - end should contain

	    Email        string `json:"email"`
        Mobile    int32  `json:"mobile"`

- Response from backend  

    If email id does not exist 

        {"status": false, "message": "Email id doesnt exist"}

    For successful request

        {"message": "Mobile Number Has been updated"}

## Backend Demo video(gif)
![Alt text](screenshots/backend_tests.gif?raw=true "Backend test demo")

