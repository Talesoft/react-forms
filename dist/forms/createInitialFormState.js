"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationState_1 = __importDefault(require("./ValidationState"));
const immutable_1 = require("immutable");
const createRecord = immutable_1.Record({
    initialValue: undefined,
    value: immutable_1.Map(),
    submitting: false,
    submitted: false,
    validationState: ValidationState_1.default.NOT_VALIDATED,
    fieldStates: immutable_1.Map(),
});
function createInitialFormState(initialValue) {
    return createRecord({ initialValue, value: immutable_1.fromJS(initialValue) });
}
exports.default = createInitialFormState;
