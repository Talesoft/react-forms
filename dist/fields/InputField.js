"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useField_1 = __importDefault(require("./useField"));
function toScriptValue(target) {
    var _a, _b;
    switch (target.type) {
        case 'file':
            return target.multiple ? target.files : (_b = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
        case 'checkbox':
            return target.checked;
        case 'number':
        case 'range':
            return parseInt(target.value, 10);
        case 'time':
        case 'date':
        case 'datetime-local':
            return Math.floor(target.valueAsNumber / 1000);
        default:
            return target.value;
    }
}
function toFieldValueProps(inputProps, value) {
    switch (inputProps.type) {
        case 'file':
            return {};
        case 'checkbox':
            return { checked: !!value };
        case 'radio':
            return { checked: value === inputProps.value };
        case 'number':
        case 'range':
            return { value: parseInt(value, 10) };
        case 'time':
            return { value: new Date(value * 1000).toISOString().substr(11, 8) };
        case 'date':
            return { value: new Date(value * 1000).toISOString().substr(0, 10) };
        case 'datetime-local':
            return { value: new Date(value * 1000).toISOString().substr(0, 19) };
        default:
            return { value: value };
    }
}
function InputField(props) {
    var _a;
    const { value, setValue } = useField_1.default((_a = props.name) !== null && _a !== void 0 ? _a : '');
    const valueProps = toFieldValueProps(props, value);
    return react_1.default.createElement("input", Object.assign({}, props, valueProps, { onChange: event => setValue(toScriptValue(event.target)) }));
}
exports.default = InputField;
