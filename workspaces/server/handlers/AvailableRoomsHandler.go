package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"server/utils"
	"strconv"
	"strings"
	"time"
)

func AvailableRoomsHandler(w http.ResponseWriter, r *http.Request) {

	//decode the json request to check availability of rooms
	currRequest := &models.Booking{}
	err := json.NewDecoder(r.Body).Decode(currRequest)
	//check if a valid request has been sent from front end
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	noOfExecutiveRoomsOccupied := 0
	noOfDeluxeRoomsOccupied := 0
	var roomsReserved string

	//parsing time from string to type time
	const layout = "2006-01-02"
	in, _ := time.Parse(layout, currRequest.CheckInDummy)
	out, _ := time.Parse(layout, currRequest.CheckOutDummy)
	currRequest.CheckIn = in.Add(time.Hour * 4)
	currRequest.CheckOut = out.Add(time.Hour * 4)

	// Use GORM API build SQL
	//check if any rooms are available which havent been booked yet in the requested check-in and check-out dates
	resultDeluxe := []uint{}
	resultExecutive := []uint{}
	var e models.Booking
	var d models.Booking

	//find out if executive rooms are available
	rows, err := utils.DB.Model(&currRequest).Where("check_in BETWEEN ? AND ? AND check_out BETWEEN ? AND ? AND type_of_room = ?", currRequest.CheckIn, currRequest.CheckOut, currRequest.CheckIn, currRequest.CheckOut, "executive").Select("room_id").Rows()
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	} else {
		defer rows.Close()
		for rows.Next() {
			noOfExecutiveRoomsOccupied = noOfExecutiveRoomsOccupied + 1
			utils.DB.ScanRows(rows, &e)
			resultExecutive = append(resultExecutive, e.RoomID)
		}
	}

	//find out if deluxe rooms are available
	rows, err = utils.DB.Model(&currRequest).Where("check_in BETWEEN ? AND ? AND check_out BETWEEN ? AND ? AND type_of_room = ?", currRequest.CheckIn, currRequest.CheckOut, currRequest.CheckIn, currRequest.CheckOut, "deluxe").Select("room_id").Rows()
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	} else {
		defer rows.Close()
		for rows.Next() {
			noOfDeluxeRoomsOccupied = noOfDeluxeRoomsOccupied + 1
			utils.DB.ScanRows(rows, &d)
			resultDeluxe = append(resultDeluxe, d.RoomID)
		}
	}

	//calculate the number of rooms in the database
	res := utils.DB.Find(&models.Room{})
	rowcount := res.RowsAffected

	//check if all the rooms are occupied in the specified time frame
	//if all the rooms are occupied
	noOfRoomsOccupied := noOfExecutiveRoomsOccupied + noOfDeluxeRoomsOccupied
	if noOfRoomsOccupied == int(rowcount) {
		var resp = map[string]interface{}{"status": false, "message": "no rooms available in the specified time period"}
		json.NewEncoder(w).Encode(resp)
		return
	} else {
		//if all the rooms are not occupied
		//calculate the number of rooms required to make the booking
		noOfRooms := (currRequest.NoOfGuests + currRequest.NoOfChildren) / 2
		if (currRequest.NoOfGuests+currRequest.NoOfChildren)%2 == 1 {
			noOfRooms = noOfRooms + 1
		}

		//get available room information
		currAvailabiltty := &models.RoomPrice{}

		//assuming there are qual number of executive and deluxe rooms
		//Executive room logic
		//if rooms are available, then get the price of the rooms and calculate the total amount of the executive rooms
		if int(noOfRooms) <= int(rowcount/2)-noOfExecutiveRoomsOccupied {
			//assign rooms if available
			var exRoomiID models.Room
			rows, err := utils.DB.Model(&models.Room{}).Where("type_of_room = ?", "executive").Not(resultExecutive).Limit(noOfRooms).Rows()
			//total amount to be paid initially zero
			exAmount := 0
			if err != nil {
				json.NewEncoder(w).Encode(err)
				fmt.Print("error occured in select statement to get room ids to assign for executive rooms")
				return
			} else {
				defer rows.Close()
				for rows.Next() {
					utils.DB.ScanRows(rows, &exRoomiID)
					roomsReserved = roomsReserved + strconv.Itoa(int(exRoomiID.RoomID)) + ","
					exAmount = exAmount + exRoomiID.Price
				}
			}
			currAvailabiltty.ExecutiveAmount = strconv.Itoa(exAmount) + "$"
			currAvailabiltty.ExecutiveAvailability = true
		} else {
			currAvailabiltty.ExecutiveAvailability = false
		}

		//Deluxe room logic
		//if rooms are available, then get the price of the rooms and calculate the total amount of the deluxe rooms available
		if int(noOfRooms) <= int(rowcount/2)-noOfDeluxeRoomsOccupied {
			//assign rooms if available
			var deRoomId models.Room
			rows, err := utils.DB.Model(&models.Room{}).Where("type_of_room = ?", "deluxe").Not(resultDeluxe).Limit(noOfRooms).Rows()
			//total amount to be paid initially zero
			deAmount := 0
			if err != nil {
				json.NewEncoder(w).Encode(err)
				fmt.Print("error occured in select statement to get room ids to assign for deluxe rooms")
				return
			} else {
				defer rows.Close()
				for rows.Next() {
					utils.DB.ScanRows(rows, &deRoomId)
					roomsReserved = roomsReserved + strconv.Itoa(int(deRoomId.RoomID)) + ","
					deAmount = deAmount + deRoomId.Price

				}
			}
			currAvailabiltty.DeluxeAmount = strconv.Itoa(deAmount) + "$"
			currAvailabiltty.DeluxeAvailability = true
		} else {
			currAvailabiltty.DeluxeAvailability = false
		}

		roomsReserved = strings.TrimRight(roomsReserved, ",")
		var success = map[string]interface{}{"message": "Rooms are available in the defined checkin-checkout dates"}

		//Store the token in the response

		currAvailabiltty.NoOfRoomsToBook = uint(noOfRooms)
		currAvailabiltty.ReserveRooms = roomsReserved
		success["noofroomstobook"] = currAvailabiltty.NoOfRoomsToBook
		success["executiveAmount"] = currAvailabiltty.ExecutiveAmount
		success["deluxeAmount"] = currAvailabiltty.DeluxeAmount
		success["executiveAvailability"] = currAvailabiltty.ExecutiveAvailability
		success["deluxeAvailability"] = currAvailabiltty.DeluxeAvailability
		success["reserveRooms"] = currAvailabiltty.ReserveRooms
		json.NewEncoder(w).Encode(success)
		return
	}
}
