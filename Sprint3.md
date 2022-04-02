# Sprint 3 - Summary of tasks achieved

## Project - Overview

The idea is to provide a web-application to book rooms at Reitz Union hotel.

## Useful links of the project
- [Reitz-Union-Hotel-Management Repo Link](https://github.com/Stnagam/Reitz-Union-Hotel-Management) 
- [Sprint 3 User stories progress under projects](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects/4)
- [All user stories link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/projects/1)
- [All issues link](https://github.com/Stnagam/Reitz-Union-Hotel-Management/issues)

## Demo links for sprint3
- [end to end demo of the project](https://www.youtube.com/watch?v=7bo0VVv3ueM)

## How to run the project
#### Backend
- execute roomData.sql to load room information into rooms table.
- create .env file with environment variables.
- Go to server folder and run the command `go run main.go` to start the server.

#### Frontend
- go to client folder and run the command `npm start` to start the client

## UI Tasks achieved - (React js)
- Customer home page: customer can raise request
- Admin page: admin can manage requests in pending, assigned and completed sections
- Available rooms page: customer can select different types of rooms in the selected check-in check-out dates
- Integrated booking workflow with the application
- Secure API calls from front end to all APIS in the backend
- Cypress tests for the front end functionality

## Backend Tasks achieved - (Golang)
- Created API to check the availablity of different types of rooms in the selected check-in and check-out dates
- Updated the booking API according to available rooms handler
- Created API to raise customer requests
- Created APIs to to get pending, assigned and completed requests
- Created APIs to update request status from pending to assigned (assigning to an employee) and assigned to completed
- Created API to delete completed customer requests
- Created unit tests for all the new and updated APIs

## Backend API documentation

#### Available rooms API

- Allows user to see different types of rooms available in the selected checkin-checkout dates.
- URL: localhost:8080/availablerooms
- The request from front - end should contain:

        Email           string    `json:"email"`
        NoOfGuests      int32     `json:"noOfGuests"`
        NoOfChildren    int32     `json:"noOfChildren"`
        CheckInDummy    string    `gorm:"-" json:"checkInDummy"`
        CheckOutDummy   string    `gorm:"-" json:"checkOutDummy"`

- Response from backend  

    If rooms are available (response will contain):

        `"message":"Rooms are available in the defined checkin-checkout dates"`

        noOfRoomsToBook       uint   `json:"noOfRoomsToBook"`
        DeluxeAmount          string `json:"deluxeAmount"`
        ExecutiveAmount       string `json:"executiveAmount"`
        DeluxeAvailability    bool   `json:"deluxeAvailability"`
        ExecutiveAvailability bool   `json:"executiveAvailability"`
        ReserveRooms          string `json:"reserveRooms"`

    If no rooms are available in the selected time period:

        {"message":"no rooms available in the specified time period","status":false}

    If json request is invalid:

        {"message":"Invalid json request","status":false}

#### Booking API

- Allows user to book the rooms and make the payment.
- URL: localhost:8080/bookings
- The request from front - end should contain

        TypeOfRoom      string    `json:"typeOfRoom"`
        NoOfRoomsToBook uint      `gorm:"-" json:"noOfRoomsToBook"`
        Email           string    `json:"email"`
        NoOfGuests      int32     `json:"noOfGuests"`
        NoOfChildren    int32     `json:"noOfChildren"`
        CheckInDummy    string    `gorm:"-" json:"checkInDummy"`
        CheckOutDummy   string    `gorm:"-" json:"checkOutDummy"`
        Amount          string    `json:"amount"`
        PaymentStatus   string    `json:"paymentStatus"`
        ReserveRooms    string    `gorm:"-" json:"reserveRooms"`

- Response from backend  

    For successful payment (response will contain):

        {"paymentStatus":"true"}


    If payment status is false:

        {"message":"Payment Failed"}

    For invalid json request:

        {"message":"Invalid json request","status":false}

#### Customer Requests API

- generates a unique id to the customer request.
- URL: localhost:8080/customerReqs
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request:

        {"status": false, "message": "Invalid request"}

    For successful completeion of request:

        {"message": "Request Raised"}

#### Assign Requests API

- Assigns incoming requests to an employee
- URL: localhost:8080/assignReqsToEmp
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful completeion of request 

        {"message": "Request Status Changed to Assigned"}

#### Mark Completed Requests API

- Mark completed for requests that have been carried out.
- URL: localhost:8080/markComplete
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful marking of completion of request 

        {"message": "Request Status Changed to Completed"}

#### Delete Completed Requests API

- Deletes completed requests from the database.
- URL: localhost:8080/deleteCompleted
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful deletion of request 

        {"message": "Request has been deleted"}

#### Pending  Requests API

- Gets all the pending requests from the database.
- URL: localhost:8080/pendingReqs
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful request 

        returns list of all requests that are pending

#### Assigned Requests API

- Gets all the assigned requests from the database.
- URL: localhost:8080/assignedReqs
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful request 

        returns list of all requests that are assigned

####  Completed Requests API

- Gets all the completed requests.
- URL: localhost:8080/completedReqs
- The request from front - end should contain

        RequestID   string `gorm:"primary_key" json:"requestID"`
        EmployeeID  string `json:"employeeID"`
        RoomID      uint   `json:"roomNumber"`
        Email       string `json:"email"`
        RequestType string `json:"requestType"`
        Comment     string `json:"comment"`
        Status      string `json:"status"`

- Response from backend  

    If invalid request

        {"status": false, "message": "Invalid request"}

    For successful request 

        returns list of all requests that are completed


