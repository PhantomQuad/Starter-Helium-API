import React, { useState } from "react";
import DatePick from "./DatePick";
import Button from "react-bootstrap/Button";
import { ApiClient } from "./ApiClient";

export default function HostRow(props) {
  const apiClient = new ApiClient();
  const [startDate, cStartDate] = useState(new Date());
  const [endDate, cEndDate] = useState(new Date());
  const [hosthnt, cHostHnt] = useState([]);
  const [totalhnt, cTotalHnt] = useState([]);
  const [percent, cPercent] = useState(25);

  const refreshStats = () => {
    apiClient
      .getPayout(
        props.hotspotAddress,
        startDate.toLocaleDateString("sv-SE"),
        endDate.toLocaleDateString("sv-SE")
      )
      .then((res) => {
        // updateStats(res.data);
        // console.log(`refresh Accounts array`, res.data.data);
        cTotalHnt(res.data.data.total.toFixed(2));
        cHostHnt(((res.data.data.total / 100) * percent).toFixed(2));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <td>
        <a href={props.hotspotLink + props.hotspotAddress} target="_blank">
          {props.hotspotName}
        </a>
      </td>
      <td>
        <DatePick
          id={`startdate-${props.id}`}
          name={`startdate-${props.id}`}
          text="Start Date!"
          setter={cStartDate}
          selected={startDate}
        />
      </td>
      <td>
        <DatePick
          name={`enddate-${props.id}`}
          text="End Date!"
          setter={cEndDate}
          selected={endDate}
          minDate={startDate}
        />
      </td>
      <td>
        <input
          name={`percent-${props.id}`}
          type="number"
          defaultValue={percent}
          onChange={(e) => cPercent(e.target.value)}
        ></input>
      </td>
      <td>
        <label type="text" id={`hosthnt-${props.id}`}>
          {hosthnt}
        </label>
        HNT
      </td>
      <td>
        <label type="text" id={`totalhnt-${props.id}`}>
          {totalhnt}
        </label>
        HNT
      </td>
      <td>
        <Button variant="primary" onClick={() => refreshStats()}>
          Update
        </Button>
        {/* <Button variant="primary" onClick={() => removeHost(host.id)}>
          Remove Host
        </Button> */}
      </td>
    </>
  );
}
