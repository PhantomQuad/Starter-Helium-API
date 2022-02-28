import React, { useState, useEffect } from "react";
import { ApiClient } from "./ApiClient";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

function Commission() {
  // const accountLink = "https://explorer.helium.com/accounts/";
  const hotspotLink = "https://explorer.helium.com/hotspots/";
  const apiClient = new ApiClient();
  const [stats, cStats] = useState({});
  const [helium, cHelium] = useState(0);
  const [rate, cRate] = useState(0);
  const [percent, cPercent] = useState(0);
  const [search, cSearch] = useState([""]);
  // const [account, cAccount] = useState({
  //   address: "14pdsYdHs738B84vKdHWrbSKyL5TfagyJekFwxZBnnigiRLN6fV",
  // });
  const [hotspot, cHotspot] = useState({
    name: "Delightful Walnut Starling",
    address: "112KWyajxjigtBZQyHUzqGtUjAFPWaE4uCWpqzbJWs5pYqZZajvL",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const updateStats = (response) => {
    cStats({
      total: response.data.total.toFixed(2),
      host: ((response.data.total / 100) * percent).toFixed(2),
      from: response.meta.min_time,
      to: response.meta.max_time,
    });
    apiClient
      .getHelium()
      .then((res) => {
        updateHelium(res.data[0]);
        console.log(`refresh Helium array`, res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateHelium = (response) => {
    cHelium(response.price);
    console.log(response.price);
  };

  const runSearch = (input) => {
    apiClient
      .runSearch(input)
      .then((res) => {
        cSearch(res.data.data);
        console.log(`search array`, res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateHotspotList = (event) => {
    event.preventDefault();
    let input = document.getElementById("searchHotspot").value;
    input = input.split(" ").join("-");
    runSearch(input);
    console.log(`input is`, input);
    document.getElementById("searchHotspot").value = "";
    // console.log(`event is`, event);
    // console.log(`event is`, event.target);
    // console.log(`event is`, event.target.value);
    // console.log(`event is`, event.searchHotspot);
  };

  const updateHotspot = (names) => {
    let dosplit = names.name.split("-").join(" ");
    let docapitalize = dosplit.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    console.log(`names`, docapitalize);
    console.log(`address`, names.address);
    cHotspot({
      name: docapitalize,
      address: names.address,
    });
  };

  const updateRate = (response) => {
    response.map((current) =>
      current.currency === "GBP" ? cRate(current.rate) : rate
    );
  };

  const setRate = () => {
    apiClient
      .getExchange()
      .then((res) => {
        updateRate(res.data);
        // console.log(`refresh Exchange array`, res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshStats = () => {
    apiClient
      .getPayout(
        hotspot,
        startDate.toLocaleDateString("sv-SE"),
        endDate.toLocaleDateString("sv-SE")
      )
      .then((res) => {
        updateStats(res.data);
        console.log(`refresh Accounts array`, res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const buildPayouts = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Current HNT Price</th>
            <th>£{(helium / rate).toFixed(2)}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Account</th>
            <th>From</th>
            <th>To</th>
            <th>Host(%)</th>
            <th>Host Share</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Nav.Item>
                <Nav.Link target="_blank" href={hotspotLink + hotspot.address}>
                  {hotspot.name}
                </Nav.Link>
              </Nav.Item>
            </td>
            <td>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              >
                <div style={{ color: "red" }}>Start Date!</div>
              </DatePicker>
            </td>
            <td>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              >
                <div style={{ color: "red" }}>End Date!</div>
              </DatePicker>
            </td>
            {/* <td>{percent}</td> */}
            <td>
              <input
                type="number"
                onChange={(e) => cPercent(e.target.value)}
              ></input>
            </td>
            <td>{stats.host}HNT</td>
            <td>{stats.total}HNT</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>£{((stats.host * helium) / rate).toFixed(2)}</td>
            <td>£{((stats.total * helium) / rate).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const buildHotspotList = () => {
    if (search != "") {
      return (
        <DropdownButton
          menuVariant="dark"
          id="dropdown-item-button"
          title="Select your hotspot"
        >
          {search.map((names, index) => (
            <Dropdown.Item
              key={index}
              as="button"
              onClick={() => updateHotspot(names)}
            >
              {names.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      );
    } else {
      return console.log("search currently empty");
    }
  };

  useEffect(() => {
    setRate();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {buildPayouts()};
      <Button variant="primary" type="submit" onClick={() => refreshStats()}>
        Update Page
      </Button>
      <Form>
        <input
          type="text"
          id="searchHotspot"
          name="searchHotspot"
          placeholder="Enter Hotspot Name"
        />
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => updateHotspotList(event)}
        >
          Search
        </Button>
      </Form>
      {buildHotspotList()};
    </>
  );
}

export default Commission;
