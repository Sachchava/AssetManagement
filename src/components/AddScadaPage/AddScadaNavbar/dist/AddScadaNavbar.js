"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./AddScadaNavbar.css");
var profileimg_png_1 = require("../profileimg.png");
var axios_1 = require("axios");
var _939052_png_1 = require("./../939052.png");
function AddScadaNavbar() {
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState(""), scadaname = _a[0], setScadaname = _a[1];
    var _b = react_1.useState(""), userHere = _b[0], setUserHere = _b[1];
    var handlelogout = function () {
        var response = axios_1["default"].post("https://localhost:7100/api/Login/logout?username=" + "admin");
        console.log(response);
        navigate("/");
        localStorage.clear();
    };
    react_1.useEffect(function () {
        if (location.state && location.state.sname) {
            setScadaname(location.state.sname);
        }
        if (location.state && location.state.scadaname) {
            setScadaname(location.state.scadaname);
        }
        if (location.state && location.state.suser) {
            setUserHere(location.state.suser);
        }
        console.log(userHere);
    }, [location.state]);
    var sentence = "Adding Sensor values for " + scadaname;
    return (react_1["default"].createElement("div", { className: "maindiv" },
        react_1["default"].createElement("div", { className: "asupperdiv" },
            react_1["default"].createElement("div", { className: "asuleftdiv" },
                react_1["default"].createElement("img", { src: _939052_png_1["default"], className: "aslogoimg", height: "50px", alt: "" }),
                react_1["default"].createElement("h3", { className: "asuleftdivh3" }, "automation")),
            react_1["default"].createElement("div", { className: "asurightdiv" },
                react_1["default"].createElement("div", { className: "admindropdown" },
                    react_1["default"].createElement("button", { className: "adminbutton" }, "Admin"),
                    react_1["default"].createElement("div", { className: "primgdiv" },
                        react_1["default"].createElement("img", { className: "profileimg", src: profileimg_png_1["default"], alt: "" }))))),
        react_1["default"].createElement("div", { className: "aslowerdiv" },
            react_1["default"].createElement("div", { className: "asmpnpagename" },
                react_1["default"].createElement("h3", { className: "pagenameh3" }, sentence)),
            react_1["default"].createElement("div", { className: "options" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", onClick: handlelogout, className: "optionsa2" }, "Logout"))))));
}
exports["default"] = AddScadaNavbar;
