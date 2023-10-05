import React from "react";
import Navbar from "./maincomponents/navbar/Navbar.tsx";
import AssetsBlock from "./maincomponents/assets/AssetsBlock.tsx";

import "./MainPage.css";

export default function MainPage() {
 
  return (  
    <div className="scada-contianer">
      <Navbar/>
      <AssetsBlock />
    </div>
  );
}
