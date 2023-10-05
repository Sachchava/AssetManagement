"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./styles.css");
var axios_1 = require("axios");
var engg_png_1 = require("./engg.png");
var quotationmarks_png_1 = require("./quotationmarks.png");
var _939052_png_1 = require("./939052.png");
require("react-toastify/dist/ReactToastify.css");
var react_toastify_1 = require("react-toastify");
function Login() {
    var _this = this;
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(""), errorMessage = _c[0], setErrorMessage = _c[1];
    console.log(localStorage);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var emaildata, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    emaildata = { userName: email, password: password };
                    e.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].post("https://localhost:7100/api/Login/login", emaildata)];
                case 2:
                    response = _b.sent();
                    if (response.status === 200) {
                        localStorage.setItem(email, response.data);
                        console.log(localStorage);
                        console.log(localStorage[email]);
                        react_toastify_1.toast.success("logged in successfully");
                        navigate("/home", {
                            state: {
                                username: email
                            }
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    react_toastify_1.toast.error("invalid credentials or user already logged in ");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // useEffect(()=>{
    //   if(localStorage.length!=0){
    //     navigate("/home", {
    //       state: {
    //         username: email,
    //       },
    //     });
    //   }
    // })
    return (react_1["default"].createElement("div", { className: "maindiv" },
        react_1["default"].createElement("div", { className: "divb" },
            react_1["default"].createElement("div", { className: "lnav" }),
            react_1["default"].createElement("div", { className: "llogo" },
                react_1["default"].createElement("img", { src: _939052_png_1["default"], height: "50px", alt: "" }),
                react_1["default"].createElement("h3", { className: "llogoh2" }, "automation")),
            react_1["default"].createElement("div", { className: "lnrightdiv" },
                react_1["default"].createElement("h2", { className: "lnrightdivh2" }, "SCADA Management")),
            react_1["default"].createElement("div", { className: "div1b" },
                react_1["default"].createElement("h2", { className: "webui" }, " We develop perfect "),
                react_1["default"].createElement("img", { className: "qmarks", src: quotationmarks_png_1["default"], alt: "" }),
                react_1["default"].createElement("img", { className: "qmarksre", src: quotationmarks_png_1["default"], alt: "" }),
                react_1["default"].createElement("img", { className: "div1bimg", src: engg_png_1["default"], height: "300px", alt: "" })),
            react_1["default"].createElement("div", { className: "div2b" },
                react_1["default"].createElement("form", { className: "form", onSubmit: handleSubmit },
                    react_1["default"].createElement("h2", { className: "forml1" },
                        "Username",
                        react_1["default"].createElement("span", { className: "requiredd" }, "*")),
                    react_1["default"].createElement("input", { className: "emailinput", value: email, type: "text", onChange: function (e) { return setEmail(e.target.value); } }),
                    react_1["default"].createElement("h2", { className: "forml2" },
                        "Password",
                        react_1["default"].createElement("span", { className: "requiredd" }, "*")),
                    react_1["default"].createElement("input", { className: "passwordinput", value: password, onChange: function (e) { return setPassword(e.target.value); }, type: "password" }),
                    react_1["default"].createElement("button", { type: "submit", className: "submitbutton" }, "Login"),
                    errorMessage && react_1["default"].createElement("p", { className: "errormessage" }, errorMessage),
                    react_1["default"].createElement("a", { href: "#", className: "registerlink", onClick: function () { return navigate("/register"); } }, "Register"))),
            react_1["default"].createElement("div", { className: "foot" },
                react_1["default"].createElement("h3", null, "\u00A9ABC Automation 2023 ")))));
}
exports["default"] = Login;
