import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import deleteicon from "./../../delete.png";
import updateicon from "./../../update.png";

export default function AssetsBlock() {
  const [scadas, setScadas] = useState<any>([]);
  const[user,setUser] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state.username);
  const control = location.state.username;

  const getallscadas = async () => {
    axios
      .get("https://localhost:7100/api/Login/uniquescadas")
      .then((data) => {
        console.log(data)
        setScadas(data.data);
        console.log(scadas, "admin");
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {});
  };
  const getuserscadas = async () => {
    axios
    .get(
      `https://localhost:7100/api/Login/scadas_for_users?username=${control}`
    )
    .then((data) => {
      setScadas(data.data);
      console.log(scadas, "user");
    })
    .catch((error) => { 
      console.error(error.message);
    })
    .finally(() => {});
  };
  useEffect(() => {
    
    if (control === "admin") {
      getallscadas();
    } else {
      getuserscadas();
    }
  }, []);

  return (
    <div className="mpnassetmaindiv">
      <div className="mpnassetheader">
        <h2 className="mpnassetheaderh2">Assets</h2>
        
      </div>

      <table className="scadatable">
        <thead className="theader">
          <tr className="row">
          <th className="theaders">Sr no.</th>
            <th className="theaders">Scada Name</th>
            <th className="theaders">Last Updated</th>
            <th className="theaders">Average Production</th>
            <th className="theaders">Action</th>
            </tr>
        </thead>
        {scadas.length === 0 ? (
  <p className="noscadas">No scadas available</p>
) : (
        <tbody>

          {scadas.map((item:any, index:any ) => (
            <tr key={index} className="rowval" >
              <td className="trows">{index+1}</td>
              <td className="trows">{item.scadaName}</td>
              <td className="trows">{item.timestamp}</td>
              <td className="trows">{item.sensorValue}</td>
              <td className="trowsbutton"  onClick={() => {
              navigate("/scada", {
                state: {
                  scadaname: item.scadaName,
                  username:control
                },
              });
            }}>view</td>
            </tr>
          ))}
        </tbody>
        )}
      </table>
    </div>
  );
}
