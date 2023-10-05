import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddScadaNavbar.css";
import profilepic from "../profileimg.png";
import axios from "axios";
import aslogo from "./../939052.png";

export default function AddScadaNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scadaname, setScadaname] = useState<string>("");
  const [userHere, setUserHere] = useState<string>("");

  const handlelogout = () => {
    const response = axios.post(
      `https://localhost:7100/api/Login/logout?username=${"admin"}`
    );
    console.log(response);
    navigate("/");
    localStorage.clear();
  };

  useEffect(() => {
    
    if (location.state && location.state.sname) {
      setScadaname(location.state.sname);
    }
    if (location.state && location.state.scadaname) {
      setScadaname(location.state.scadaname);
    }
    if (location.state && location.state.suser) {
      setUserHere(location.state.suser);
    }
  
  console.log(userHere)
  }, [location.state]);
  const sentence = "Adding Sensor values for " + scadaname;

  return (
    <div className="maindiv">
      <div className="asupperdiv">
        <div className="asuleftdiv">
          <img src={aslogo} className="aslogoimg" height="50px" alt="" />
          <h3 className="asuleftdivh3">automation</h3>
        </div>
        <div className="asurightdiv">
          <div className="admindropdown">
            <button className="adminbutton">Admin</button>
            <div className="primgdiv">
              <img className="profileimg" src={profilepic} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="aslowerdiv">
        <div className="asmpnpagename">
          <h3 className="pagenameh3">{sentence}</h3>
        </div>
        <div className="options">
          {/* <div><a href = "#" className="optionsa1">Admin Panel</a></div> */}
          <div>
            <a href="#" onClick={handlelogout} className="optionsa2">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
