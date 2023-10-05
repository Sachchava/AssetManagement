import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import logimg from "./engg.png";
import qmark from "./quotationmarks.png";
import lllogo from "./939052.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";



export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(localStorage)
  const handleSubmit = async (e) => {
    const emaildata = { userName: email, password: password };
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7100/api/Login/login",
        emaildata
      );

      if (response.status === 200) {
        localStorage.setItem(email,response.data)
        console.log(localStorage)
        
        console.log(localStorage[email])
        toast.success("logged in successfully");
        navigate("/home", {
          state: {
            username: email,
          },
        });
      }
    } catch {
      toast.error("invalid credentials or user already logged in ");
    }
  };
// useEffect(()=>{
//   if(localStorage.length!=0){
//     navigate("/home", {
//       state: {
//         username: email,
//       },
//     });
//   }
// })
  return (
    <div className="maindiv">
      <div className="divb">
        <div className="lnav"></div>
        <div className="llogo">
          <img src={lllogo} height="50px" alt="" />
          <h3 className="llogoh2">automation</h3>
        </div>
        <div className="lnrightdiv">
          <h2 className="lnrightdivh2">SCADA Management</h2>
        </div>
        <div className="div1b">
          <h2 className="webui"> We develop perfect </h2>
          <img className="qmarks" src={qmark} alt="" />
          <img className="qmarksre" src={qmark} alt="" />
          <img className="div1bimg" src={logimg} height="300px" alt="" />
        </div>

        <div className="div2b">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="forml1">
              Username<span className="requiredd">*</span>
            </h2>
            <input
              className="emailinput"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h2 className="forml2">
              Password<span className="requiredd">*</span>
            </h2>
            <input
              className="passwordinput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button type="submit" className="submitbutton">
              Login
            </button>
            {errorMessage && <p className="errormessage">{errorMessage}</p>}
            <a
              href="#"
              className="registerlink"
              onClick={() => navigate("/register")}
            >
              Register
            </a>
          </form>
        </div>
        <div className="foot">
          <h3>©ABC Automation 2023 </h3>
        </div>
      </div>
    </div>
  );
}
