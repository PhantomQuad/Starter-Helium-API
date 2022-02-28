import React from "react";
import Commission from "./Commission";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

function App() {
  return (
    <>
      <Commission />
    </>
  );
}

export default App;
