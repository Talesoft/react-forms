"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createInitialFormState_1 = __importDefault(require("./createInitialFormState"));
const react_1 = require("react");
const reduceForm_1 = __importDefault(require("./reduceForm"));
const createFormStateDispatchers_1 = __importDefault(require("./createFormStateDispatchers"));
function useForm(options) {
    const initialFormState = react_1.useMemo(() => createInitialFormState_1.default(options.initialValue), [options.initialValue]);
    const [state, dispatch] = react_1.useReducer(reduceForm_1.default, initialFormState);
    const dispatchers = react_1.useMemo(() => createFormStateDispatchers_1.default(options, state, dispatch), [options, state, dispatch]);
    return react_1.useMemo(() => (Object.assign({ state }, dispatchers)), [state, dispatchers]);
}
exports.default = useForm;
