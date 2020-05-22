"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useFieldArray_1 = __importDefault(require("./useFieldArray"));
function FieldArray({ name, children }) {
    const dispatchers = useFieldArray_1.default(name);
    return children(dispatchers);
}
exports.default = FieldArray;
