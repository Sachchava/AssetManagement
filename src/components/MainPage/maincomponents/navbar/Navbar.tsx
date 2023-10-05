import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./mainpagenavbarstyles.css";
import profilepic from "../../profileimg.png"
import axios from 'axios';
import mplogo from "./../../939052.png"

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
const [pageuser,setPageuser] = useState<string>("")
const [stylename,setstylename] = useState<string>("")

  const handlelogout = () =>{
    const response = axios.post(
      `https://localhost:7100/api/Login/logout?username=${location.state.username}`
    )
    console.log(response);
    localStorage.clear();
    navigate("/");

  };


 
  useEffect(() => {
    // Check if location.state and location.state.pageuser exist before accessing them
   
    if (location.state && location.state.username) {
      if (location.state.username==="admin"){
        setPageuser("Admin")
        setstylename("moptionsa1")
       }
       else{
         setPageuser(location.state.username)
         setstylename("dontdisplay")
       }
    }
  }, [location.state]);
  // console.log(location.state)
  return (
    <div className="maindiv">
      <div className="mpupperdiv">
        <div className="uleftdiv"  >
         <img src={mplogo} className="mplogoimg" height="50px" alt="" />
         <h3 className="uleftdivh3">automation</h3>
        </div>
        <div className="urightdiv">
          <div className="admindropdown">
            <button className="adminbutton">{pageuser}</button>
            <div className="primgdiv"><img className="profileimg" src={profilepic} alt="" /></div>
          </div>
        </div>
      </div>
      <div className="mplowerdiv">
        <div className="mpnpagename"><h3 className="pagenameh3">Home</h3></div>
        <div className="options">
          <div><a href = "#" className={stylename} onClick={() => navigate("/adminpanel", { state: { pageuser } })}>Admin Panel</a></div>
       
          <div><a href = "#" className="optionsa2" onClick={handlelogout}>Logout</a></div>
          </div>
      </div>
    </div>
  );
}
