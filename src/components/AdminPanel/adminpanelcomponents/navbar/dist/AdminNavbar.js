"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./adminpanelnavbarstyles.css");
var profileimg_png_1 = require("../../profileimg.png");
var axios_1 = require("axios");
var _939052_png_1 = require("./../../939052.png");
function Navbar() {
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState(""), userhere = _a[0], setUserHere = _a[1];
    react_1.useEffect(function () {
        console.log("ineffect");
        if (location.state && location.state.pageuser) {
            setUserHere(location.state.pageuser);
            console.log(userhere.toLowerCase());
        }
    }, [location.state]);
    var handlelogout = function () {
        var response = axios_1["default"].post("https://localhost:7100/api/Login/logout?username=" + "admin");
        console.log(response);
        navigate("/");
        localStorage.clear();
    };
    return (react_1["default"].createElement("div", { className: "maindiv" },
        react_1["default"].createElement("div", { className: "apupperdiv" },
            react_1["default"].createElement("div", { className: "apuleftdiv" },
                react_1["default"].createElement("img", { src: _939052_png_1["default"], className: "aplogoimg", height: "50px", alt: "" }),
                react_1["default"].createElement("h3", { className: "apuleftdivh3" }, "automation")),
            react_1["default"].createElement("div", { className: "urightdiv" },
                react_1["default"].createElement("div", { className: "admindropdown" },
                    react_1["default"].createElement("button", { className: "adminbutton" }, "Admin"),
                    react_1["default"].createElement("div", { className: "primgdiv" },
                        react_1["default"].createElement("img", { className: "profileimg", src: profileimg_png_1["default"], alt: "" }))))),
        react_1["default"].createElement("div", { className: "aplowerdiv" },
            react_1["default"].createElement("div", { className: "appagename" },
                react_1["default"].createElement("h3", { className: "appagenameh3" }, "AdminPanel")),
            react_1["default"].createElement("div", { className: "options" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: "apoptionsa2", onClick: handlelogout }, "Logout"))))));
}
exports["default"] = Navbar;
