import React from "react";
import ScadaNavbar from "./Scadacomponents/navbarscada/ScadaNavbar.tsx";
import ScadaMaincomponents from "./Scadacomponents/scadamaincomponents/ScadaMainComponents.tsx";

export default function ScadaDetails(){
  return(
    <div className="scadadetailsmaindiv">
      <ScadaNavbar/>  
      <ScadaMaincomponents/>
    </div>
  )
}