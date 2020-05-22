"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useFormContext_1 = __importDefault(require("../forms/useFormContext"));
const immutable_1 = require("immutable");
function useField(path) {
    const { registerField, unregisterField, getFieldValue, setFieldValue } = useFormContext_1.default();
    react_1.useEffect(() => {
        registerField(path);
        return () => unregisterField(path);
    }, [path]);
    const value = getFieldValue(path);
    return {
        immutableValue: value,
        // Make the normal value lazy, especially nested structures and
        // arrays rather work with the immutableValue for performance
        get value() {
            return (immutable_1.isImmutable(value) ? value.toJS() : value);
        },
        setValue: (newValue) => setFieldValue(path, immutable_1.fromJS(newValue)),
    };
}
exports.default = useField;
