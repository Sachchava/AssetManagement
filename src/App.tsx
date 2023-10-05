import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/LoginPage/login.tsx";
import Register from "./components/RegisterPage/Register.tsx";

import MainPage from "./components/MainPage/MainPage.tsx";
import AdminPanel from "./components/AdminPanel/AdminPanel.tsx";
import ScadaDetails from "./components/ScadaDetailsPage/ScadaDetails.tsx";
import SensorsPage from "./components/SesnorsPage/SensorsPage.tsx";
import AddScada from "./components/AddScadaPage/AddScada.tsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<MainPage  />}  />
        <Route path="/adminpanel" element={<AdminPanel/>  }/>
        <Route path="/scada" element = {<ScadaDetails/>}/>
        <Route path="/sensor" element = {<SensorsPage/> }/>
        <Route path="/scadadetails" element = {<AddScada/> }/>
      </Routes>
      <ToastContainer 
        autoClose={2000}
        position="top-center"
        hideProgressBar={true}
        className="toast-container"
        toastStyle={{ color: "blue" }}/>
    </Router>
  );
}
