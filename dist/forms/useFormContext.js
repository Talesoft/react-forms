"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const FormContext_1 = __importDefault(require("./FormContext"));
function useFormContext() {
    return react_1.useContext(FormContext_1.default);
}
exports.default = useFormContext;
