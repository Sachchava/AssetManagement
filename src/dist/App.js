"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var login_tsx_1 = require("./components/LoginPage/login.tsx");
var Register_tsx_1 = require("./components/RegisterPage/Register.tsx");
var MainPage_tsx_1 = require("./components/MainPage/MainPage.tsx");
var AdminPanel_tsx_1 = require("./components/AdminPanel/AdminPanel.tsx");
var ScadaDetails_tsx_1 = require("./components/ScadaDetailsPage/ScadaDetails.tsx");
var SensorsPage_tsx_1 = require("./components/SesnorsPage/SensorsPage.tsx");
var AddScada_tsx_1 = require("./components/AddScadaPage/AddScada.tsx");
require("react-toastify/dist/ReactToastify.css");
var react_toastify_1 = require("react-toastify");
function App() {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(login_tsx_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/register", element: react_1["default"].createElement(Register_tsx_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/home", element: react_1["default"].createElement(MainPage_tsx_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/adminpanel", element: react_1["default"].createElement(AdminPanel_tsx_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/scada", element: react_1["default"].createElement(ScadaDetails_tsx_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/sensor", element: react_1["default"].createElement(SensorsPage_tsx_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/scadadetails", element: react_1["default"].createElement(AddScada_tsx_1["default"], null) })),
        react_1["default"].createElement(react_toastify_1.ToastContainer, { autoClose: 2000, position: "top-center", hideProgressBar: true, className: "toast-container", toastStyle: { color: "blue" } })));
}
exports["default"] = App;
