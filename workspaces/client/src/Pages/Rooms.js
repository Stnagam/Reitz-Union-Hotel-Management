import Header from "../default/headerHome.js";
import React, { useState } from "react";
import axios from "axios";

// const [Room,setRoom]= useState([]);

const getRoom = async (roomID, checkInDate, checkOutDate) => {
    try {
      const response = await axios.get(
        `/api/rooms?roomID=${roomID}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      );
      const json = response.data;
      if (json && json.data) {
        return json.data.map(({ room }) => room);
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };
  export {getRoom};