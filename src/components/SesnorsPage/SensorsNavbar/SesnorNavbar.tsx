import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./sensorpagenavbarstyles.css";
import profilepic from "../profileimg.png";
import axios from "axios";
import splogoimg from "./../939052.png"

export default function SesnorNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sensornameprop = location.state.sensorname;
  console.log(location.state.username);
  let pageuser = "";
  let stylename = "";
  if (location.state.username === "admin") {
    pageuser = "Admin";
    stylename = "moptionsa1";
  } else {
    pageuser = location.state.username;
    stylename = "dontdisplay";
  }
  const handlelogout = () =>{
    const response = axios.post(
      `https://localhost:7100/api/Login/logout?username=${location.state.username}`
    )
    console.log(response);
    navigate("/");
    localStorage.clear();
  };
  // console.log(sensornameprop)
  // const handleControlPanel = () =>{
  //   history.push("/control")
  // };
  // console.log(location.state)
  return (
    <div className="maindiv">
      <div className="spupperdiv">
        <div className="spuleftdiv">
        <img src={splogoimg} onClick={() => navigate("/home", {
          state: {
            username: location.state.username,
          }
        })
        } className="splogoimg" height="50px" alt="" />
         <h3 className="uleftdivh3">automation</h3>
        </div>
        <div className="urightdiv">
          <div className="admindropdown">
            <button className="sadminbutton">{pageuser}</button>
            <div className="sprimgdiv">
              <img className="sprofileimg" src={profilepic} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="splowerdiv">
        <div className="senmpnpagename">
          <h3 className="senpagenameh3">{sensornameprop}</h3>
        </div>
        <div className="options">
          <div>
            <a
              href="#"
              className={stylename}
              onClick={() => navigate("/adminpanel")}
            >
              Admin Panel
            </a>
          </div>
          {/* <Link to="/adminpanel" className="optionsa1">Admin Panel</Link> */}
          <div>
            <a href="#" className="optionsa2" onClick={handlelogout}>
              Logout
            </a>
          </div>
        </div>
      </div>  
    </div>
  );
}
