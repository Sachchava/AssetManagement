import React from "react";
import "./AddScada.css"
import AddScadaNavbar from "./AddScadaNavbar/AddScadaNavbar.tsx";
import AddScadaMain from "./AddScadaMain/AddScadaMain.tsx";
export default function AddScada(){
  return(
    <div>
      <AddScadaNavbar/>
    <AddScadaMain/>
    </div>
  )
}