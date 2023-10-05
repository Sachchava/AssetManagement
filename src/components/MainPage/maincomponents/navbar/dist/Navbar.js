"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./mainpagenavbarstyles.css");
var profileimg_png_1 = require("../../profileimg.png");
var axios_1 = require("axios");
var _939052_png_1 = require("./../../939052.png");
function Navbar() {
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState(""), pageuser = _a[0], setPageuser = _a[1];
    var _b = react_1.useState(""), stylename = _b[0], setstylename = _b[1];
    var handlelogout = function () {
        var response = axios_1["default"].post("https://localhost:7100/api/Login/logout?username=" + location.state.username);
        console.log(response);
        localStorage.clear();
        navigate("/");
    };
    react_1.useEffect(function () {
        // Check if location.state and location.state.pageuser exist before accessing them
        if (location.state && location.state.username) {
            if (location.state.username === "admin") {
                setPageuser("Admin");
                setstylename("moptionsa1");
            }
            else {
                setPageuser(location.state.username);
                setstylename("dontdisplay");
            }
        }
    }, [location.state]);
    // console.log(location.state)
    return (react_1["default"].createElement("div", { className: "maindiv" },
        react_1["default"].createElement("div", { className: "mpupperdiv" },
            react_1["default"].createElement("div", { className: "uleftdiv" },
                react_1["default"].createElement("img", { src: _939052_png_1["default"], className: "mplogoimg", height: "50px", alt: "" }),
                react_1["default"].createElement("h3", { className: "uleftdivh3" }, "automation")),
            react_1["default"].createElement("div", { className: "urightdiv" },
                react_1["default"].createElement("div", { className: "admindropdown" },
                    react_1["default"].createElement("button", { className: "adminbutton" }, pageuser),
                    react_1["default"].createElement("div", { className: "primgdiv" },
                        react_1["default"].createElement("img", { className: "profileimg", src: profileimg_png_1["default"], alt: "" }))))),
        react_1["default"].createElement("div", { className: "mplowerdiv" },
            react_1["default"].createElement("div", { className: "mpnpagename" },
                react_1["default"].createElement("h3", { className: "pagenameh3" }, "Home")),
            react_1["default"].createElement("div", { className: "options" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: stylename, onClick: function () { return navigate("/adminpanel", { state: { pageuser: pageuser } }); } }, "Admin Panel")),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("a", { href: "#", className: "optionsa2", onClick: handlelogout }, "Logout"))))));
}
exports["default"] = Navbar;
