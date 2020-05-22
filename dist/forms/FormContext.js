"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createInitialFormState_1 = __importDefault(require("./createInitialFormState"));
const react_1 = require("react");
const createFormStateDispatchers_1 = __importDefault(require("./createFormStateDispatchers"));
const initialFormOptions = { initialValue: {} };
const initialFormState = createInitialFormState_1.default(initialFormOptions.initialValue);
const FormContext = react_1.createContext(Object.assign({ state: initialFormState }, createFormStateDispatchers_1.default(initialFormOptions, initialFormState, () => undefined)));
exports.default = FormContext;
