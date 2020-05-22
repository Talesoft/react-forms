"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useFormContext_1 = __importDefault(require("../forms/useFormContext"));
function InputField(_a) {
    var { name } = _a, spanProps = __rest(_a, ["name"]);
    const { getFieldValue } = useFormContext_1.default();
    return react_1.default.createElement("span", Object.assign({}, spanProps), getFieldValue(name !== null && name !== void 0 ? name : ''));
}
exports.default = InputField;
