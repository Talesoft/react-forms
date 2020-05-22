"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useField_1 = __importDefault(require("./useField"));
function SelectField(props) {
    var _a;
    const { value, setValue } = useField_1.default((_a = props.name) !== null && _a !== void 0 ? _a : '');
    console.log(value);
    return (react_1.default.createElement("select", Object.assign({}, props, { value: value, onChange: event => setValue(props.multiple
            ? Array.from(event.target.options)
                .filter(opt => opt.selected)
                .map(opt => opt.value)
            : event.target.value) })));
}
exports.default = SelectField;
