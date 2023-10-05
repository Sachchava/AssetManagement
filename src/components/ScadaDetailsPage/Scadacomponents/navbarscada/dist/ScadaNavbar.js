"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./ScadaNavbar.css");
var profileimg_png_1 = require("../../profileimg.png");
var axios_1 = require("axios");
var _939052_png_1 = require("./../../939052.png");
function ScadaNavbar() {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
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
    // console.log(location.state.username)
    // console.log(location.state)
    // const handleControlPanel = () =>{
    //   history.push("/control")
    // };
    return (react_1["default"].createElement("div", { className: "maindiv" },
        react_1["default"].createElement("div", { className: "asupperdiv" },
            react_1["default"].createElement("div", { className: "asuleftdiv" },
                react_1["default"].createElement("img", { src: _939052_png_1["default"], className: "aslogoimg", onClick: function () { return navigate("/home", {
                        state: {
                            username: location.state.username
                        }
                    }); }, height: "50px", alt: "" }),
                react_1["default"].createElement("h3", { className: "asuleftdivh3" }, "automation")),
            react_1["default"].createElement("div", { className: "asurightdiv" },
                react_1["default"].createElement("div", { className: "admindropdown" },
                    react_1["default"].createElement("button", { className: "adminbutton" }, pageuser),
                    react_1["default"].createElement("div", { className: "sxprimgdiv" },
                        react_1["default"].createElement("img", { className: "sxprofileimg", src: profileimg_png_1["default"], alt: "" }))))),
        react_1["default"].createElement("div", { className: "aslowerdiv" },
            react_1["default"].createElement("div", { className: "smpnpagename" },
                react_1["default"].createElement("h3", { className: "pagenameh3" }, location.state.scadaname)),
            react_1["default"].createElement("div", { className: "options" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: stylename, onClick: function () { return navigate("/adminpanel"); } }, "Admin Panel")),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: "optionsa2", onClick: handlelogout }, "Logout"))))));
}
exports["default"] = ScadaNavbar;
