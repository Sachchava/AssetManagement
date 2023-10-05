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
require("./AddScadaMain.css");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
function AddScadaMain() {
    var _this = this;
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState([]), sensorVals = _a[0], setSensorVals = _a[1];
    var _b = react_1.useState(""), selectedSensor = _b[0], setSelectedSensor = _b[1];
    var _c = react_1.useState(""), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = react_1.useState(""), scadaname = _d[0], setScadaname = _d[1];
    var _e = react_1.useState([]), sensorDetails = _e[0], setSensorDetails = _e[1];
    var _f = react_1.useState(""), scadaId = _f[0], setScadaId = _f[1];
    var getallsensors = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://localhost:7100/api/Login/getscadadetails?scadaname=" + scadaname)
                .then(function (data) {
                console.log(data);
                setSensorDetails(data.data);
                console.log(sensorDetails, "admin");
            })["catch"](function (error) {
                console.error(error.message);
            })["finally"](function () { });
            return [2 /*return*/];
        });
    }); };
    var getScadaId = function (scname) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(scname);
            axios_1["default"]
                .get("https://localhost:7100/api/Login/get_scadaid?scadaname=" + scname)
                .then(function (data) {
                console.log(data.data);
                setScadaId(data.data);
            })["catch"](function (error) {
                react_toastify_1.toast.error("didnt got scadaId");
            })["finally"](function () { });
            return [2 /*return*/];
        });
    }); };
    var handleSubmit1 = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var scadadetails, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // console.log(scadadetails, "scadadetails");
                    e.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    scadadetails = {
                        scadaName: scadaname,
                        sensorName: selectedSensor,
                        timestamp: new Date(),
                        sensorValue: sensorVals,
                        scadaId: scadaId
                    };
                    return [4 /*yield*/, axios_1["default"].post("https://localhost:7100/api/Login/Addscadadetails", scadadetails)];
                case 2:
                    response = _b.sent();
                    if (response.status === 200) {
                        react_toastify_1.toast.success("Added successfully");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    react_toastify_1.toast.error("Some error occured ");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSensorChange = function (e) {
        setSelectedSensor(e.target.value);
    };
    var updateStrToArray1 = function (data) {
        var stringchunks = data.split(",");
        console.log(stringchunks);
        setSensorVals(stringchunks);
    };
    react_1.useEffect(function () {
        if (location.state && location.state.sname) {
            setScadaname(location.state.sname);
        }
        if (location.state && location.state.scadaname) {
            setScadaname(location.state.scadaname);
        }
        console.log(scadaname);
        getScadaId(scadaname);
    });
    return (react_1["default"].createElement("div", { className: "addscadamaindiv" },
        react_1["default"].createElement("div", { className: "addscadabox1" },
            react_1["default"].createElement("div", { className: "addscadaboxheaderdiv" },
                " ",
                react_1["default"].createElement("h2", { className: "addscadaformheader" }, "Add SensorValues")),
            react_1["default"].createElement("form", { className: "addscadaform1", onSubmit: handleSubmit1 },
                react_1["default"].createElement("div", { className: "svformdiv1" },
                    react_1["default"].createElement("h2", { className: "addscadaformh1" }, "Sensor Name"),
                    react_1["default"].createElement("select", { name: "sensorname", className: "selectsensor", value: selectedSensor, onChange: handleSensorChange },
                        react_1["default"].createElement("option", { value: "sensor1" }, "Sensor1"),
                        react_1["default"].createElement("option", { value: "sensor2" }, "Sensor2"),
                        react_1["default"].createElement("option", { value: "sensor3" }, "Sensor3"))),
                react_1["default"].createElement("div", { className: "svformdiv2" },
                    react_1["default"].createElement("h2", { className: "addscadaformsvh1" }, "Sensor Values"),
                    react_1["default"].createElement("input", { className: "svinput", value: sensorVals, onChange: function (e) { return updateStrToArray1(e.target.value); }, type: "text" })),
                react_1["default"].createElement("button", { type: "submit", className: "svsubmitbutton" }, "Add values"),
                errorMessage && react_1["default"].createElement("p", { className: "errormessage" }, errorMessage))),
        react_1["default"].createElement("div", { className: "sensorsdatadiv" },
            react_1["default"].createElement("div", { className: "svddiv" },
                react_1["default"].createElement("h2", { className: "svddivh2" }, "Sensor Values"),
                react_1["default"].createElement("h2", { className: "svddivh3", onClick: function () { getallsensors(); } }, "Get ")),
            react_1["default"].createElement("table", { className: "scadatable" },
                react_1["default"].createElement("thead", { className: "theader" },
                    react_1["default"].createElement("tr", { className: "row" },
                        react_1["default"].createElement("th", { className: "theaders" }, "Sr no."),
                        react_1["default"].createElement("th", { className: "theaders" }, "Sensor Name"),
                        react_1["default"].createElement("th", { className: "theaders" }, "Timestamp "),
                        react_1["default"].createElement("th", { className: "theaders" }, "Sensor Values"))),
                react_1["default"].createElement("tbody", null, sensorDetails.map(function (item, index) { return (react_1["default"].createElement("tr", { key: index, className: "rowval" },
                    react_1["default"].createElement("td", { className: "trows" }, index + 1),
                    react_1["default"].createElement("td", { className: "trows" }, item.sensorName),
                    react_1["default"].createElement("td", { className: "trows" }, item.timestamp),
                    react_1["default"].createElement("td", { className: "trows" }, item.sensorValue))); }))))));
}
exports["default"] = AddScadaMain;
