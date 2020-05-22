"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useField_1 = __importDefault(require("./useField"));
const immutable_1 = require("immutable");
function isList(value) {
    return value instanceof immutable_1.List;
}
function useFieldArray(name) {
    const { immutableValue, setValue } = useField_1.default(name);
    if (!isList(immutableValue)) {
        throw new Error(`immutableValue needs to be a immutable.js List. ` +
            `You probably don't have an array stored in ${name}'s value`);
    }
    return react_1.useMemo(() => ({
        push: (...values) => setValue(immutableValue.push(...values.map((value) => immutable_1.fromJS(value)))),
        pop: () => setValue(immutableValue.pop()),
        unshift: (...values) => setValue(immutableValue.unshift(...values.map((value) => immutable_1.fromJS(value)))),
        shift: () => setValue(immutableValue.shift()),
        insert: (key, value) => setValue(immutableValue.insert(key, value)),
        remove: (key) => setValue(immutableValue.remove(key)),
        map: (fn) => immutableValue.map((_0, key) => {
            const childName = (path) => [name, key, path].join('.');
            const insertBefore = (value) => setValue(immutableValue.insert(key - 1, value));
            const insertAfter = (value) => setValue(immutableValue.insert(key, value));
            const remove = () => setValue(immutableValue.remove(key));
            return fn({ childName, key, insertBefore, insertAfter, remove });
        }),
    }), [immutableValue]);
}
exports.default = useFieldArray;
