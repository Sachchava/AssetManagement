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
var pump_png_1 = require("./pump.png");
require("./ScadaMaincomponents.css");
var react_plotly_js_1 = require("react-plotly.js");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
function ScadaMaincomponents() {
    var _this = this;
    var _a = react_1.useState([]), sensorData = _a[0], setSensorData = _a[1];
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation();
    var _b = react_1.useState([]), sensorChartData = _b[0], setSensorChartData = _b[1];
    var scadaprop = location.state.scadaname;
    var getData = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://localhost:7100/api/Login/getscadadetails?scadaname=" + scadaprop)];
                case 1:
                    response = _a.sent();
                    console.log(response.data);
                    setSensorData(response.data);
                    createSensorChartData(response.data);
                    return [2 /*return*/];
            }
        });
    }); };
    var createSensorChartData = function (data) {
        var sensorChartData = {};
        data.forEach(function (item) {
            if (!sensorChartData[item.sensorName]) {
                sensorChartData[item.sensorName] = {
                    x: [],
                    y: [],
                    name: item.sensorName
                };
            }
            sensorChartData[item.sensorName].x.push(item.timestamp);
            sensorChartData[item.sensorName].y.push(item.sensorValue);
        });
        var _loop_1 = function (key) {
            if (sensorChartData.hasOwnProperty(key)) {
                var sensor_1 = sensorChartData[key];
                var sortedIndices = sensor_1.x
                    .map(function (_, index) { return index; })
                    .sort(function (a, b) { return new Date(sensor_1.x[a]) - new Date(sensor_1.x[b]); });
                console.log(sortedIndices);
                sensor_1.x = sortedIndices.map(function (index) { return sensor_1.x[index]; });
                sensor_1.y = sortedIndices.map(function (index) { return sensor_1.y[index]; });
                console.log(sensor_1);
            }
        };
        for (var key in sensorChartData) {
            _loop_1(key);
        }
        setSensorChartData(Object.values(sensorChartData));
    };
    react_1.useEffect(function () {
        getData();
    }, []);
    var handleLineClick = function (event) {
        var sensorName = event.points[0].data.name;
        var sensorData = sensorChartData.find(function (data) { return data.name === sensorName; });
        navigate("/sensor", {
            state: {
                sensorname: sensorName,
                timearr: sensorData.x,
                sensorvalarr: sensorData.y,
                username: location.state.username
            }
        });
    };
    return (react_1["default"].createElement("div", { className: "scadamaincomponentsmaindiv" },
        react_1["default"].createElement("div", { className: "scadaimgdiv" },
            react_1["default"].createElement("img", { className: "scadaimg", src: pump_png_1["default"], alt: "" })),
        react_1["default"].createElement("div", { className: "sensorgraph" },
            react_1["default"].createElement(react_plotly_js_1["default"], { style: { width: "57vw", height: "64vh" }, data: sensorChartData, config: { responsive: true }, layout: {
                    title: "Sensor Data",
                    xaxis: { title: "Timestamp" },
                    yaxis: { title: "Sensor Value" }
                }, onClick: handleLineClick }))));
}
exports["default"] = ScadaMaincomponents;
