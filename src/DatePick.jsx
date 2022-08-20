import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePick(props) {
  const handleDateChange = (date) => {
    props.setter(date);
    // console.log(date);
  };

  return (
    <>
      {" "}
      <DatePicker
        id={props.id}
        name={props.name}
        dateFormat="dd-MM-yyyy"
        minDate={props.minDate}
        selected={props.selected}
        onChange={handleDateChange}
      >
        <div style={{ color: "red" }}>{props.text}</div>
      </DatePicker>
    </>
  );
}
