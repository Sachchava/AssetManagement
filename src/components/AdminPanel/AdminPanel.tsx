import React from "react";
import "./styles.css"
import Navbar from "./adminpanelcomponents/navbar/AdminNavbar.tsx"
import AssetsBlock from "./adminpanelcomponents/assets/AdminPanelAssetsBlock.tsx";

export default function AdminPanel(){
  return(
    <div>
      <Navbar/>
      <AssetsBlock/>
    </div>
  )
}