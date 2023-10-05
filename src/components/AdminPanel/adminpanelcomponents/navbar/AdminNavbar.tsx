import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./adminpanelnavbarstyles.css";
import profilepic from "../../profileimg.png";
import axios from "axios";
import aplogo from "./../../939052.png"


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userhere, setUserHere] = useState<string>("");

  useEffect(() => {
    
    console.log("ineffect")
    if (location.state && location.state.pageuser) {
      setUserHere(location.state.pageuser);
      console.log(userhere.toLowerCase())
    }
  }, [location.state]);
  const handlelogout = () =>{
    
    const response = axios.post(
      `https://localhost:7100/api/Login/logout?username=${"admin"}`
    )
    console.log(response);
    navigate("/");
    localStorage.clear();
  };
  return (
    <div className="maindiv">
      <div className="apupperdiv">
   
        <div className="apuleftdiv"  >
         <img src={aplogo} className="aplogoimg" height="50px" alt="" />
         <h3 className="apuleftdivh3">automation</h3>
        </div>
        <div className="urightdiv">
        <div className="admindropdown">
            <button className="adminbutton">Admin</button>
            <div className="primgdiv"><img className="profileimg" src={profilepic} alt="" /></div>
          </div>
        </div>
      </div>
      <div className="aplowerdiv">
      <div className="appagename"><h3 className="appagenameh3">AdminPanel</h3></div>
        <div className="options">
       
          <div><a href = "#" className="apoptionsa2" onClick={handlelogout}>Logout</a></div>
          </div>
      </div>
    </div>
  );
}
