import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ScadaNavbar.css";
import profilepic from "../../profileimg.png"
import axios from "axios";
import aslogoimg1 from "./../../939052.png"

export default function ScadaNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let pageuser = "";
  let  stylename=""
  if (location.state.username==="admin"){
    pageuser="Admin"
    stylename="moptionsa1"
  }
  else{
    pageuser=location.state.username
    stylename="dontdisplay"
   
  }
  const handlelogout = () =>{
    const response = axios.post(
      `https://localhost:7100/api/Login/logout?username=${location.state.username}`
    )
    console.log(response);
    navigate("/");
    localStorage.clear();
  };
  // console.log(location.state.username)
  // console.log(location.state)
  // const handleControlPanel = () =>{
  //   history.push("/control")
  // };

  return (
    <div className="maindiv">
      <div className="asupperdiv">
        <div className="asuleftdiv">
        <img src={aslogoimg1} className="aslogoimg" onClick={() => navigate("/home", {
          state: {
            username: location.state.username,
          }
        })
        } height="50px" alt="" />
         <h3 className="asuleftdivh3">automation</h3>
        </div>
        <div className="asurightdiv">
          <div className="admindropdown">
            <button className="adminbutton">{pageuser}</button>
            <div className="sxprimgdiv"><img className="sxprofileimg" src={profilepic} alt="" /></div>
          </div>
        </div>
      </div>
      <div className="aslowerdiv">
        <div className="smpnpagename"><h3 className="pagenameh3">{location.state.scadaname}</h3></div>
        <div className="options">
          <div><a href = "#" className={stylename} onClick={()=>navigate("/adminpanel")}>Admin Panel</a></div>
          {/* <Link to="/adminpanel" className="optionsa1">Admin Panel</Link> */}
          <div><a href = "#" className="optionsa2" onClick={handlelogout}>Logout</a></div>
          </div>
      </div>
    </div>
  );
}
