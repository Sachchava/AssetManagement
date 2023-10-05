"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_toastify_1 = require("react-toastify");
var customtoast_tsx_1 = require("customtoast.tsx");
var customToast = () = {
    success: function (msg, options) {
        if (options === void 0) { options = {}; }
        return react_toastify_1.toast.success(msg, __assign(__assign({}, options), { className: 'toast-success-container toast-success-container-after', progressClassName: customtoast_tsx_1.css({
                background: '#34A853'
            }) }));
    },
    error: function (msg, options) {
        if (options === void 0) { options = {}; }
        return react_toastify_1.toast.error(msg, __assign(__assign({}, options), { className: 'toast-error-container toast-error-container-after', progressClassName: customtoast_tsx_1.css({
                background: '#EE0022'
            }) }));
    },
    info: function (msg, options) {
        if (options === void 0) { options = {}; }
        return react_toastify_1.toast.info(msg, __assign(__assign({}, options), { className: 'toast-info-container toast-info-container-after', progressClassName: customtoast_tsx_1.css({
                background: '#07F'
            }) }));
    }
};
exoprt;
customToast;
