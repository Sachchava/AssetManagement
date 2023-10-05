import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import updatelogo from "./../../update.png"
import deletelogo from "./../../delete.png"
import { toast } from 'react-toastify';
  

export default function AssetsBlock() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userhere, setUserhere] = useState("");
  const [scadas, setScadas] = useState([]);
  const [scadaname, setscadaname] = useState("");
  const [scadadesc, setscadadesc] = useState("");
  const [postScada, setPostScada] = useState(null);
  const [uvscadaname, setuvscadaName] = useState("");
  const[uvusername,setuvusername] = useState("");
  const [username, setUsername] = useState("");
  const control = "admin";
  function createview() {
    if (uvscadaname==""){
      toast.warn("scada name is empty")
      return;
    }
    if (uvusername==""){
      toast.warn("user name is empty")
      return;
    }
    const response = axios.post("https://localhost:7100/api/Login/AddView", {
      userName: uvusername,
      scadaName: uvscadaname,
    });
    toast.success("View added successfull");
    
  }
  const scadapicall = ()=> {
    console.log(scadaname)
    console.log(scadadesc)
    if (scadaname==""){
      toast.warn("scada name is empty")
      return;
    }
    
    if (scadadesc!=="active" && scadadesc!=="inactive" ){
      toast.warn("scada status should be active or inactive")
      return;
    }



    axios
    .post("https://localhost:7100/api/Login/addScada",{
      scadaName: scadaname,
      scadaDesc: scadadesc,
    })
    .then((data) => {
      toast.success("Added successfully")
      console.log(data);
      navigate("/scadadetails", {
        state: {
          sname: scadaname,
          suser: userhere,
        },
      });
    })
    .catch((error) => {
      toast.error("scada already exists");
    })
    .finally(() => {});
   
  }
  const getscadas = async () => {
    axios
      .get("https://localhost:7100/api/Login/getallscadas")
      .then((data) => {
        console.log(data);
        setScadas(data.data);
        console.log(scadas, "admin");
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {});
  };
const deletecall = async (scadaname:any) =>{
  console.log(scadaname)
    axios.delete(`https://localhost:7100/api/Login/deletescadas?scadaname=${scadaname}`)
  }
 
  // if (!postScada)return "No Posts"
  useEffect(() => {
    getscadas();
    if (location.state && location.state.pageuser) {
      setUserhere(location.state.pageuser);
    }
  }, []);
  return (
    <div className="assetmaindiv">
      <div className="assets">
        <div className="assetheader">
          <h2 className="assetheaderh2">Assets</h2>
        </div>
        <table className="scadatable">
          <thead className="theader">
            <tr className="aprow">
              <th className="aprows">Scada Name</th>
              <th className="aprows">Scada Status</th>
              <th className="aprows">Action</th>
        
            </tr>
          </thead>
          <tbody>
            {scadas.map((item: any, index) => (
              <tr
                key={index}
                className="aprowval"
              >
                <td className="aprowvals">{item.scadaName}</td>

                <td className="aprowvals">{item.scadaDesc}</td>
                <td className="aprowvalsupdate"><img onClick={() => {
                  navigate("/scadadetails", {
                    state: {
                      scadaname: item.scadaName,
                      username: {control},
                    },
                  });
                }}className="apupdatelogo" src={updatelogo} height="30px" alt="" />
                <img className="apdeletelogo" onClick={()=>{deletecall(item.scadaName)}} src={deletelogo}  height="30px" alt="" />
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="addscadas">
        <div className="addscadaheader">
          <h2 className="addscadaheaderh2">Add Scadas</h2>
        </div>
        <div className="addscadadesc">
          <form className="addscadaform">
            <h2 className="scadanameh2">Scada Name</h2>
            <input
              className="scadanameinput"
              type="text"
              value={scadaname}
              onChange={(e) => setscadaname(e.target.value)}
            />

            <h2 className="scadastatus">Scada Status</h2>
            <div className="statusandbutton">
            <label>
              <input
                type="radio"
                className="scadastatusradiobutton1"
                value="active"
                checked={scadadesc === "active"}
                onChange={(e)=>setscadadesc(e.target.value)}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                className="scadastatusradiobutton2"
                value="inactive"
                checked={scadadesc === "inactive"}
                onChange={(e)=>setscadadesc(e.target.value)}
              />
              Inactive
            </label>
          </div>
            <input
              className="addscadabutton"
              type="submit"
              onClick={scadapicall}
            />
            </form>
            <form className="uvadderform">
            <h2 className="vsusername">User Name</h2>
            <input
              className="vvscadastatusinput"
              type="text"
           
              value={uvusername}
              onChange={(e) => setuvusername(e.target.value)}
            />
            <h2 className="scadanameh2">Scada Name</h2>
            <input
              className="vvscadastatusinput"
              type="text"
              value={uvscadaname}
              onChange={(e) => setuvscadaName(e.target.value)}
            />

            <input
              className="vaddscadabutton"
              type="submit"
              value="Add view"
              onClick={createview}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
