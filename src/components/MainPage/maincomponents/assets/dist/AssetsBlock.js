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
function AssetsBlock() {
    var _this = this;
    var _a = react_1.useState([]), scadas = _a[0], setScadas = _a[1];
    var _b = react_1.useState(""), user = _b[0], setUser = _b[1];
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    // console.log(location.state.username);
    var control = location.state.username;
    var getallscadas = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://localhost:7100/api/Login/uniquescadas")
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
    var getuserscadas = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://localhost:7100/api/Login/scadas_for_users?username=" + control)
                .then(function (data) {
                setScadas(data.data);
                console.log(scadas, "user");
            })["catch"](function (error) {
                console.error(error.message);
            })["finally"](function () { });
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        if (control === "admin") {
            getallscadas();
        }
        else {
            getuserscadas();
        }
    }, []);
    return (react_1["default"].createElement("div", { className: "mpnassetmaindiv" },
        react_1["default"].createElement("div", { className: "mpnassetheader" },
            react_1["default"].createElement("h2", { className: "mpnassetheaderh2" }, "Assets")),
        react_1["default"].createElement("table", { className: "scadatable" },
            react_1["default"].createElement("thead", { className: "theader" },
                react_1["default"].createElement("tr", { className: "row" },
                    react_1["default"].createElement("th", { className: "theaders" }, "Sr no."),
                    react_1["default"].createElement("th", { className: "theaders" }, "Scada Name"),
                    react_1["default"].createElement("th", { className: "theaders" }, "Last Updated"),
                    react_1["default"].createElement("th", { className: "theaders" }, "Average Production"),
                    react_1["default"].createElement("th", { className: "theaders" }, "Action"))),
            scadas.length === 0 ? (react_1["default"].createElement("p", { className: "noscadas" }, "No scadas available")) : (react_1["default"].createElement("tbody", null, scadas.map(function (item, index) { return (react_1["default"].createElement("tr", { key: index, className: "rowval" },
                react_1["default"].createElement("td", { className: "trows" }, index + 1),
                react_1["default"].createElement("td", { className: "trows" }, item.scadaName),
                react_1["default"].createElement("td", { className: "trows" }, item.timestamp),
                react_1["default"].createElement("td", { className: "trows" }, item.sensorValue),
                react_1["default"].createElement("td", { className: "trowsbutton", onClick: function () {
                        navigate("/scada", {
                            state: {
                                scadaname: item.scadaName,
                                username: control
                            }
                        });
                    } }, "view"))); }))))));
}
exports["default"] = AssetsBlock;
