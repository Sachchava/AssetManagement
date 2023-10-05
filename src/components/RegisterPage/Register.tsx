import React, { useState } from "react";
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

  const isPasswordValid = (password) => {
  
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    const emaildata = { userName: email, password: password };

    if (!isPasswordValid(password)) {
      toast.warn("password must be 8digits")
      return;
    }

    e.preventDefault();
    try {
      const response = await axios
        .post("https://localhost:7100/api/Login/CreateUser", emaildata)
      
      if (response.status === 200) {
        toast.success("Created successfully");
        navigate("/", {
          state: {
            username: email,
          },
        });
      }
      else{
        toast.error("user already exists");
      }
    } catch {
      toast.error("user already exists");
    }
  };

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
              Create username<span className="requiredd">*</span>
            </h2>
            <input
              className="emailinput"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h2 className="forml2">
               Create password<span className="requiredd">*</span>
            </h2>
            <input
              className="passwordinput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button type="submit" className="submitbutton">
              Create
            </button>
            {errorMessage && <p className="errormessage">{errorMessage}</p>}
            <a
              href="#"
              className="registerlink"
              onClick={() => navigate("/")}
            >
              Login
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

