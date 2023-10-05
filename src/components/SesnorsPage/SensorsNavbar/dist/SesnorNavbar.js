"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./sensorpagenavbarstyles.css");
var profileimg_png_1 = require("../profileimg.png");
var axios_1 = require("axios");
var _939052_png_1 = require("./../939052.png");
function SesnorNavbar() {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    var sensornameprop = location.state.sensorname;
    console.log(location.state.username);
    var pageuser = "";
    var stylename = "";
    if (location.state.username === "admin") {
        pageuser = "Admin";
        stylename = "moptionsa1";
    }
    else {
        pageuser = location.state.username;
        stylename = "dontdisplay";
    }
    var handlelogout = function () {
        var response = axios_1["default"].post("https://localhost:7100/api/Login/logout?username=" + location.state.username);
        console.log(response);
        navigate("/");
        localStorage.clear();
    };
    // console.log(sensornameprop)
    // const handleControlPanel = () =>{
    //   history.push("/control")
    // };
    // console.log(location.state)
    return (react_1["default"].createElement("div", { className: "maindiv" },
        react_1["default"].createElement("div", { className: "spupperdiv" },
            react_1["default"].createElement("div", { className: "spuleftdiv" },
                react_1["default"].createElement("img", { src: _939052_png_1["default"], onClick: function () { return navigate("/home", {
                        state: {
                            username: location.state.username
                        }
                    }); }, className: "splogoimg", height: "50px", alt: "" }),
                react_1["default"].createElement("h3", { className: "uleftdivh3" }, "automation")),
            react_1["default"].createElement("div", { className: "urightdiv" },
                react_1["default"].createElement("div", { className: "admindropdown" },
                    react_1["default"].createElement("button", { className: "sadminbutton" }, pageuser),
                    react_1["default"].createElement("div", { className: "sprimgdiv" },
                        react_1["default"].createElement("img", { className: "sprofileimg", src: profileimg_png_1["default"], alt: "" }))))),
        react_1["default"].createElement("div", { className: "splowerdiv" },
            react_1["default"].createElement("div", { className: "senmpnpagename" },
                react_1["default"].createElement("h3", { className: "senpagenameh3" }, sensornameprop)),
            react_1["default"].createElement("div", { className: "options" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: stylename, onClick: function () { return navigate("/adminpanel"); } }, "Admin Panel")),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: "optionsa2", onClick: handlelogout }, "Logout"))))));
}
exports["default"] = SesnorNavbar;
