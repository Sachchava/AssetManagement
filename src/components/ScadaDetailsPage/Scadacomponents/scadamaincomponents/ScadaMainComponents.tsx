import React, { useEffect, useState } from "react";
import pump from "./pump.png";
import "./ScadaMaincomponents.css";
import Plot from "react-plotly.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ScadaMaincomponents() {
  const [sensorData, setSensorData] = useState<any>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [sensorChartData, setSensorChartData] = useState<any[]>([]);
  const scadaprop = location.state.scadaname;

  const getData = async () => {
    const response = await axios.get(
      `https://localhost:7100/api/Login/getscadadetails?scadaname=${scadaprop}`
    );
    console.log(response.data)
    setSensorData(response.data);
    createSensorChartData(response.data);
  };

  const createSensorChartData = (data: any) => {
    const sensorChartData = {};

    data.forEach((item: any) => {
      if (!sensorChartData[item.sensorName]) {
        sensorChartData[item.sensorName] = {
          x: [],
          y: [],
          name: item.sensorName,
        };
      }
      sensorChartData[item.sensorName].x.push(item.timestamp);
      sensorChartData[item.sensorName].y.push(item.sensorValue);
    });


    for (const key in sensorChartData) {
      if (sensorChartData.hasOwnProperty(key)) {
        const sensor = sensorChartData[key];
        const sortedIndices = sensor.x
          .map((_, index) => index)
          .sort((a, b) => new Date(sensor.x[a]) - new Date(sensor.x[b]));
          console.log(sortedIndices)
        sensor.x = sortedIndices.map((index) => sensor.x[index]);
        sensor.y = sortedIndices.map((index) => sensor.y[index]);
        console.log(sensor)
      }
    }

    setSensorChartData(Object.values(sensorChartData));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLineClick = (event) => {
    const sensorName = event.points[0].data.name;
    const sensorData = sensorChartData.find((data) => data.name === sensorName);
    navigate("/sensor", {
      state: {
        sensorname: sensorName,
        timearr: sensorData.x,
        sensorvalarr: sensorData.y,
        username: location.state.username,
      },
    });
  };

  return (
    <div className="scadamaincomponentsmaindiv">
      <div className="scadaimgdiv">
        <img className="scadaimg" src={pump} alt="" />
      </div>
      <div className="sensorgraph">
        <Plot
          style={{ width: "57vw", height: "64vh" }}
          data={sensorChartData}
          config={{ responsive: true }}
          layout={{
            title: "Sensor Data",
            xaxis: { title: "Timestamp" },
            yaxis: { title: "Sensor Value" },
          }}
          onClick={handleLineClick}
        />
      </div>
    </div>
  );
}
