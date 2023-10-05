  import React, { useEffect, useState } from "react";
import "./SensrosMainComponents.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";

export default function SenrosMainComponents() {
  const location = useLocation();
  const sensornameprop = location.state.sensorname;
  const timearrprop = location.state.timearr;
  const sensorvalprop = location.state.sensorvalarr;
  let forapi = "";
  if (sensornameprop === "Sensor1") {
    forapi = "sensor1";
  } else if (sensornameprop === "Sensor2") {
    forapi = "sensor2";
  } else {
    forapi = "sensor3";
  }
  console.log(forapi);
 
  const [sensordata, setSensordata] = useState<any>([]);
  const getSensorData = async () => {
    const response = await axios.get(
      `https://localhost:7100/api/Login/getsensordetails?sensorname=${forapi}`
    );
    console.log(response);

    setSensordata(response.data[0]);

  };
  console.log(sensorvalprop)
  console.log(timearrprop)
  const maxy = Math.max(...sensorvalprop);
  const miny = Math.min(...sensorvalprop);
  let total = 0;
  for (let i = 0; i < sensorvalprop.length; i++) {
    total += sensorvalprop[i];
  }
  const Avgy = total / sensorvalprop.length;

  useEffect(() => {
    getSensorData();
  }, []);

  return (
    <div className="senrosmaindiv">
      <div className="senrosdiv1">
        <Plot
          style={{ width: "55vw", height: "77vh" }}
          data={[
            {
              x: timearrprop,
              y: sensorvalprop,
              type: "scatter",
              mode: "lines",
              name: "Sensor 1",
            },
          ]}
          layout={{
            title: sensornameprop,
            xaxis: { title: "Timestamp" },
            yaxix: { title: "Sensor value" },
          }}
        />
      </div>
      <div className="senrosdiv2">
        <div className="senrosdiv2header">
          <h2 className="senrosdiv2headerh2">{sensornameprop + " details"}</h2>
        </div>
        <div className="sensoriddiv">
          <h2 className="sensordetailstitle">Sensor Id</h2>
          <h3 className="sensordetailsresponse">{sensordata.senid}</h3>
        </div>
        <div className="sensorstatusdiv">
          <h2 className="sensordetailstitle">Sensor status</h2>
          <h3 className="sensordetailsresponse">{sensordata.sensorStatus}</h3>
        </div>
        <div className="sensorlocationdiv">
          <h2 className="sensordetailstitle">Sensor location</h2>
          <h3 className="sensordetailsresponse">{sensordata.sensorLocation}</h3>
        </div>
        <div className="sensorperformancediv">
          <h2 className="sensordetailstitle">Sensor performance</h2>
          <h3 className="sensordetailsresponse">{sensordata.performance}</h3>
        </div>
        <div className="sensorminvaldiv">
          <h2 className="sensordetailstitle">Sensor Minvalue</h2>
          <h3 className="sensordetailsresponse">{miny}</h3>
        </div>
        <div className="sensormaxvaldiv">
          <h2 className="sensordetailstitle">Sensor Maxvalue</h2>
          <h3 className="sensordetailsresponse">{maxy}</h3>
        </div>
        <div className="sensoravgvaldiv">
          <h2 className="sensordetailstitle">Sensor Avgvalue</h2>
          <h3 className="sensordetailsresponse">{Avgy}</h3>
        </div>
      </div>
    </div>
  );
}
