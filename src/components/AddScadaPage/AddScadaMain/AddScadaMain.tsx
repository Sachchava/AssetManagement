import React, { useEffect, useState } from "react";
import "./AddScadaMain.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddScadaMain() {
  const location = useLocation();
  const [sensorVals, setSensorVals] = useState<number[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [scadaname, setScadaname] = useState<string>("");
  const [sensorDetails, setSensorDetails] = useState<any>([]);
  const [scadaId,setScadaId] = useState<string>("");
  
  const getallsensors = async () => {
    axios
    .get(`https://localhost:7100/api/Login/getscadadetails?scadaname=${scadaname}`)
      .then((data) => {
        console.log(data);
        setSensorDetails(data.data);
        console.log(sensorDetails, "admin");
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {});
  };
  const getScadaId = async(scname:any)=>{
    console.log(scname)
    axios
    .get(`https://localhost:7100/api/Login/get_scadaid?scadaname=${scname}`)
    .then((data)=>{
      console.log(data.data)
      setScadaId(data.data);
    })
    .catch((error)=>{
      toast.error("didnt got scadaId")
    })
    .finally(() => {});
  }
  const handleSubmit1 = async (e) => {
    // console.log(scadadetails, "scadadetails");
    e.preventDefault();
    try {
      const scadadetails = {
        scadaName: scadaname,
        sensorName: selectedSensor,
        timestamp: new Date(),
        sensorValue: sensorVals,
        scadaId: scadaId
      };
      const response = await axios.post(
        "https://localhost:7100/api/Login/Addscadadetails",
        scadadetails
      );

      if (response.status === 200) {
        toast.success("Added successfully");
      }
    } catch {
      toast.error("Some error occured ");
    }
  };

  const handleSensorChange = (e) => {
    
    setSelectedSensor(e.target.value);
  };

  const updateStrToArray1 = (data) => {
    let stringchunks = data.split(",");
    console.log(stringchunks);
    setSensorVals(stringchunks);
  };

  useEffect(() => {
    if (location.state && location.state.sname) {
      setScadaname(location.state.sname);
    }
    if (location.state && location.state.scadaname) {
      setScadaname(location.state.scadaname);
    }
   console.log(scadaname)
   getScadaId(scadaname);
  });
  return (
    <div className="addscadamaindiv">
      <div className="addscadabox1">
        <div className="addscadaboxheaderdiv">
          {" "}
          <h2 className="addscadaformheader">Add SensorValues</h2>
        </div>
        <form className="addscadaform1" onSubmit={handleSubmit1}>
          <div className="svformdiv1">
            <h2 className="addscadaformh1">Sensor Name</h2>
            <select
              name="sensorname"
              className="selectsensor"
              value={selectedSensor}
              onChange={handleSensorChange}
            >
              <option value="sensor1">Sensor1</option>
              <option value="sensor2">Sensor2</option>
              <option value="sensor3">Sensor3</option>
            </select>
          </div>
          <div className="svformdiv2">
            <h2 className="addscadaformsvh1">Sensor Values</h2>
            <input
              className="svinput"
              value={sensorVals}
              onChange={(e) => updateStrToArray1(e.target.value)}
              type="text"
            />
          </div>
          <button type="submit" className="svsubmitbutton">
            Add values
          </button>
          {errorMessage && <p className="errormessage">{errorMessage}</p>}
        </form>
      </div>
      <div className="sensorsdatadiv">
        <div className="svddiv">
          <h2 className="svddivh2">Sensor Values</h2>
          <h2 className="svddivh3" onClick={()=>{getallsensors()}}>Get </h2>
        </div>
        <table className="scadatable">
          <thead className="theader">
            <tr className="row">
              <th className="theaders">Sr no.</th>

              <th className="theaders">Sensor Name</th>
              <th className="theaders">Timestamp </th>
              <th className="theaders">Sensor Values</th>
            </tr>
          </thead>
          <tbody>
            {sensorDetails.map((item: any, index: any) => (
              <tr key={index} className="rowval">
                <td className="trows">{index + 1}</td>
                <td className="trows">{item.sensorName}</td>
                <td className="trows">{item.timestamp}</td>
                <td className="trows">{item.sensorValue}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
