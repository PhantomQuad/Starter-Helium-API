import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function DatePick(props) {
  const [theDate, setTheDate] = useState(new Date());

  return (
    <>
      {" "}
      <DatePicker
        id={props.id}
        name={props.name}
        dateFormat="dd-MM-yyyy"
        selected={theDate}
        onChange={(date) => setTheDate(date)}
      >
        <div style={{ color: "red" }}>{props.text}</div>
      </DatePicker>
    </>
  );
}
