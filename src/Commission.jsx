import React, { useState, useEffect } from "react";
import { ApiClient } from "./ApiClient";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import HostRow from "./HostRow";

function Commission() {
  // const accountLink = "https://explorer.helium.com/accounts/";
  const hotspotLink = "https://explorer.helium.com/hotspots/";
  const apiClient = new ApiClient();
  const [helium, cHelium] = useState(0);
  const [search, cSearch] = useState([""]);
  const [account, cAccount] = useState({
    address: "14pdsYdHs738B84vKdHWrbSKyL5TfagyJekFwxZBnnigiRLN6fV",
  });
  // const [hotspot, cHotspot] = useState({
  //   name: "Joyous Brunette Sawfish",
  //   address: "112S8e9e8E1bxnmVvSLzcjVonexMd6Rj6wKtPJtYgKeYQVFYuHdB",
  // });
  const [hotspots, cHotspots] = useState([]);

  const updateHelium = (response) => {
    cHelium(response.helium.gbp);
    // console.log(`price of HNT`,response.helium.gbp);
  };

  const runSearch = (input) => {
    apiClient
      .runSearch(input)
      .then((res) => {
        cSearch(res.data.data);
        // console.log(`search array`, res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const updateHotspotList = (event) => {
  //   event.preventDefault();
  //   let input = document.getElementById("searchHotspot").value;
  //   input = input.split(" ").join("-");
  //   runSearch(input);
  //   // console.log(`input is`, input);
  //   document.getElementById("searchHotspot").value = "";
  //   // console.log(`event is`, event);
  //   // console.log(`event is`, event.target);
  //   // console.log(`event is`, event.target.value);
  //   // console.log(`event is`, event.searchHotspot);
  // };

  // const updateHotspot = (names) => {
  //   let dosplit = names.name.split("-").join(" ");
  //   let docapitalize = dosplit.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  //   // console.log(`names`, docapitalize);
  //   // console.log(`address`, names.address);
  //   cHotspot({
  //     name: docapitalize,
  //     address: names.address,
  //   });
  // };

  const removeHost = (id) => {
    let filtered = hotspots.filter((item) => item.id != id);
    cHotspots(filtered);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    // console.log(this);

    console.log(e.target);
    Array.from(e.target).map((res) => {
      if (res.name) {
        console.log(res.name);
        console.log(res.value);
        // cHostHnt(res.name);
        // cTotalHnt(res.value);
      }
    });
  };

  const buildPayouts = () => {
    return (
      <Form id="hotspotTableForm" onSubmit={(e) => submitHandler(e)}>
        <Table>
          <thead>
            <tr>
              <th>Current HNT Price</th>
              <th>£{helium.toFixed(2)}</th>
              <th></th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hotspots.map((host, idx) => {
              return (
                <tr key={idx}>
                  <HostRow
                    hotspotLink={hotspotLink}
                    hotspotName={host.name}
                    hotspotAddress={host.address}
                    id={host.id}
                  />
                  {/* <td>
                    <Button
                      variant="primary"
                      onClick={() => removeHost(host.id)}
                    >
                      Remove Host
                    </Button>
                  </td> */}
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              {/* <td>£{(stats.host * helium).toFixed(2)}</td>
              <td>£{(stats.total * helium).toFixed(2)}</td> */}
              <td></td>
            </tr>
          </tbody>
        </Table>
        <Button variant="primary" type="submit">
          Update Page
        </Button>
      </Form>
    );
  };

  // const buildHotspotList = () => {
  //   if (search != "") {
  //     return (
  //       <DropdownButton
  //         menuVariant="dark"
  //         id="dropdown-item-button"
  //         title="Select your hotspot"
  //       >
  //         {search.map((names, index) => (
  //           <Dropdown.Item
  //             key={index}
  //             as="button"
  //             onClick={() => updateHotspot(names)}
  //           >
  //             {names.name}
  //           </Dropdown.Item>
  //         ))}
  //       </DropdownButton>
  //     );
  //   } else {
  //     return (
  //       <DropdownButton
  //         menuVariant="dark"
  //         id="dropdown-item-button"
  //         title="Select your hotspot"
  //       >
  //         {hotspots.map((names, index) => (
  //           <Dropdown.Item
  //             key={index}
  //             as="button"
  //             onClick={() => updateHotspot(names)}
  //           >
  //             {names.name}
  //           </Dropdown.Item>
  //         ))}
  //       </DropdownButton>
  //     );
  //   }
  // };

  const refreshHotspots = () => {
    apiClient
      .getHotspots(account)
      .then((res) => {
        let addId = res.data.data.map((data, idx) => ({
          ...data,
          id: idx,
        }));
        cHotspots(addId);
        // cHotspots(res.data.data);
        // console.log(`refresh Accounts array`, res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    refreshHotspots();
  }, []);

  return (
    <>
      {buildPayouts()}

      {/* <Form>
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
      </Form> */}
      {/* {buildHotspotList()} */}
    </>
  );
}

export default Commission;
