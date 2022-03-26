package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"server/utils"
	"strconv"
	"strings"
)

func AvailableRoomsHandler(w http.ResponseWriter, r *http.Request) {

	currRequest := &models.Booking{}
	err := json.NewDecoder(r.Body).Decode(currRequest)
	//check if a valid request has been sent from front end
	if err != nil {
		//fmt.Println(err)
		var resp = map[string]interface{}{"status": false, "message": "Invalid json request"}
		json.NewEncoder(w).Encode(resp)
		return
	}

	noOfRoomsOccupied := 0
	var roomsReserved string

	// Use GORM API build SQL
	//check if any rooms are available which havent been booked yet in the requested check-in and check-out dates
	result := []uint{}
	var b models.Booking
	rows, err := utils.DB.Model(&currRequest).Where("check_in BETWEEN ? AND ? AND check_out BETWEEN ? AND ?", currRequest.CheckIn, currRequest.CheckOut, currRequest.CheckIn, currRequest.CheckOut).Select("room_id").Rows()
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	} else {
		defer rows.Close()
		for rows.Next() {
			noOfRoomsOccupied = noOfRoomsOccupied + 1
			utils.DB.ScanRows(rows, &b)
			//fmt.Println(b.RoomID)
			result = append(result, b.RoomID)
			//fmt.Println(result)
		}
		//fmt.Println(result)
		//calculate the number of rooms in the database
		res := utils.DB.Find(&models.Room{})
		rowcount := res.RowsAffected
		//fmt.Println(rowcount)
		//check if all the rooms are occupied in the specified time frame
		//if all the rooms are occupied
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
			//if rooms are available, then get the price of the rooms and calculate the total amount of the rooms
			if int(noOfRooms) < int(rowcount)-noOfRoomsOccupied {
				//assign rooms if available
				var roomids models.Room
				rows, err := utils.DB.Model(&models.Room{}).Not(result).Limit(noOfRooms).Rows()
				//total amount to be paid initially zero
				totalAmount := 0
				if err != nil {
					json.NewEncoder(w).Encode(err)
					fmt.Print("error occured in select statement to get room ids to assign")
					return
				} else {
					defer rows.Close()
					for rows.Next() {
						utils.DB.ScanRows(rows, &roomids)
						roomsReserved = roomsReserved + strconv.Itoa(int(roomids.RoomID)) + ","
						totalAmount = totalAmount + roomids.Price
					}
				}
				roomsReserved = strings.TrimRight(roomsReserved, ",")
				var success = map[string]interface{}{"message": "Rooms are available in the defined checkin-checkout dates"}

				//Store the token in the response
				currAvailabiltty := &models.RoomPrice{}
				currAvailabiltty.NoOfRoomsToBook = uint(noOfRooms)
				currAvailabiltty.Amount = strconv.Itoa(totalAmount) + "$"
				currAvailabiltty.ReserveRooms = roomsReserved
				success["noofroomstobook"] = currAvailabiltty.NoOfRoomsToBook
				success["amount"] = currAvailabiltty.Amount
				success["reserveRooms"] = currAvailabiltty.ReserveRooms
				json.NewEncoder(w).Encode(success)
				return
			} else {
				var resp = map[string]interface{}{"status": false, "message": "not enough rooms available to accomodate all guests"}
				json.NewEncoder(w).Encode(resp)
				return
			}
		}
	}
}
