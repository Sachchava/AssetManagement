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
require("./styles.css");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var update_png_1 = require("./../../update.png");
var delete_png_1 = require("./../../delete.png");
var react_toastify_1 = require("react-toastify");
function AssetsBlock() {
    var _this = this;
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState(""), userhere = _a[0], setUserhere = _a[1];
    var _b = react_1.useState([]), scadas = _b[0], setScadas = _b[1];
    var _c = react_1.useState(""), scadaname = _c[0], setscadaname = _c[1];
    var _d = react_1.useState(""), scadadesc = _d[0], setscadadesc = _d[1];
    var _e = react_1.useState(null), postScada = _e[0], setPostScada = _e[1];
    var _f = react_1.useState(""), uvscadaname = _f[0], setuvscadaName = _f[1];
    var _g = react_1.useState(""), uvusername = _g[0], setuvusername = _g[1];
    var _h = react_1.useState(""), username = _h[0], setUsername = _h[1];
    var control = "admin";
    function createview() {
        if (uvscadaname == "") {
            react_toastify_1.toast.warn("scada name is empty");
            return;
        }
        if (uvusername == "") {
            react_toastify_1.toast.warn("user name is empty");
            return;
        }
        var response = axios_1["default"].post("https://localhost:7100/api/Login/AddView", {
            userName: uvusername,
            scadaName: uvscadaname
        });
        react_toastify_1.toast.success("View added successfull");
    }
    var scadapicall = function () {
        console.log(scadaname);
        console.log(scadadesc);
        if (scadaname == "") {
            react_toastify_1.toast.warn("scada name is empty");
            return;
        }
        if (scadadesc !== "active" && scadadesc !== "inactive") {
            react_toastify_1.toast.warn("scada status should be active or inactive");
            return;
        }
        axios_1["default"]
            .post("https://localhost:7100/api/Login/addScada", {
            scadaName: scadaname,
            scadaDesc: scadadesc
        })
            .then(function (data) {
            react_toastify_1.toast.success("Added successfully");
            console.log(data);
            navigate("/scadadetails", {
                state: {
                    sname: scadaname,
                    suser: userhere
                }
            });
        })["catch"](function (error) {
            react_toastify_1.toast.error("scada already exists");
        })["finally"](function () { });
    };
    var getscadas = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://localhost:7100/api/Login/getallscadas")
                .then(function (data) {
                console.log(data);
                setScadas(data.data);
                console.log(scadas, "admin");
            })["catch"](function (error) {
                console.error(error.message);
            })["finally"](function () { });
            return [2 /*return*/];
        });
    }); };
    var deletecall = function (scadaname) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(scadaname);
            axios_1["default"]["delete"]("https://localhost:7100/api/Login/deletescadas?scadaname=" + scadaname);
            return [2 /*return*/];
        });
    }); };
    // if (!postScada)return "No Posts"
    react_1.useEffect(function () {
        getscadas();
        if (location.state && location.state.pageuser) {
            setUserhere(location.state.pageuser);
        }
    }, []);
    return (react_1["default"].createElement("div", { className: "assetmaindiv" },
        react_1["default"].createElement("div", { className: "assets" },
            react_1["default"].createElement("div", { className: "assetheader" },
                react_1["default"].createElement("h2", { className: "assetheaderh2" }, "Assets")),
            react_1["default"].createElement("table", { className: "scadatable" },
                react_1["default"].createElement("thead", { className: "theader" },
                    react_1["default"].createElement("tr", { className: "aprow" },
                        react_1["default"].createElement("th", { className: "aprows" }, "Scada Name"),
                        react_1["default"].createElement("th", { className: "aprows" }, "Scada Status"),
                        react_1["default"].createElement("th", { className: "aprows" }, "Action"))),
                react_1["default"].createElement("tbody", null, scadas.map(function (item, index) { return (react_1["default"].createElement("tr", { key: index, className: "aprowval" },
                    react_1["default"].createElement("td", { className: "aprowvals" }, item.scadaName),
                    react_1["default"].createElement("td", { className: "aprowvals" }, item.scadaDesc),
                    react_1["default"].createElement("td", { className: "aprowvalsupdate" },
                        react_1["default"].createElement("img", { onClick: function () {
                                navigate("/scadadetails", {
                                    state: {
                                        scadaname: item.scadaName,
                                        username: { control: control }
                                    }
                                });
                            }, className: "apupdatelogo", src: update_png_1["default"], height: "30px", alt: "" }),
                        react_1["default"].createElement("img", { className: "apdeletelogo", onClick: function () { deletecall(item.scadaName); }, src: delete_png_1["default"], height: "30px", alt: "" })))); })))),
        react_1["default"].createElement("div", { className: "addscadas" },
            react_1["default"].createElement("div", { className: "addscadaheader" },
                react_1["default"].createElement("h2", { className: "addscadaheaderh2" }, "Add Scadas")),
            react_1["default"].createElement("div", { className: "addscadadesc" },
                react_1["default"].createElement("form", { className: "addscadaform" },
                    react_1["default"].createElement("h2", { className: "scadanameh2" }, "Scada Name"),
                    react_1["default"].createElement("input", { className: "scadanameinput", type: "text", value: scadaname, onChange: function (e) { return setscadaname(e.target.value); } }),
                    react_1["default"].createElement("h2", { className: "scadastatus" }, "Scada Status"),
                    react_1["default"].createElement("div", { className: "statusandbutton" },
                        react_1["default"].createElement("label", null,
                            react_1["default"].createElement("input", { type: "radio", className: "scadastatusradiobutton1", value: "active", checked: scadadesc === "active", onChange: function (e) { return setscadadesc(e.target.value); } }),
                            "Active"),
                        react_1["default"].createElement("label", null,
                            react_1["default"].createElement("input", { type: "radio", className: "scadastatusradiobutton2", value: "inactive", checked: scadadesc === "inactive", onChange: function (e) { return setscadadesc(e.target.value); } }),
                            "Inactive")),
                    react_1["default"].createElement("input", { className: "addscadabutton", type: "submit", onClick: scadapicall })),
                react_1["default"].createElement("form", { className: "uvadderform" },
                    react_1["default"].createElement("h2", { className: "vsusername" }, "User Name"),
                    react_1["default"].createElement("input", { className: "vvscadastatusinput", type: "text", value: uvusername, onChange: function (e) { return setuvusername(e.target.value); } }),
                    react_1["default"].createElement("h2", { className: "scadanameh2" }, "Scada Name"),
                    react_1["default"].createElement("input", { className: "vvscadastatusinput", type: "text", value: uvscadaname, onChange: function (e) { return setuvscadaName(e.target.value); } }),
                    react_1["default"].createElement("input", { className: "vaddscadabutton", type: "submit", value: "Add view", onClick: createview }))))));
}
exports["default"] = AssetsBlock;
