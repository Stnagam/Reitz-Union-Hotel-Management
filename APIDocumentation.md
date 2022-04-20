# Backend API documentation

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

        



