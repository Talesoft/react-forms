"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationState_1 = __importDefault(require("../forms/ValidationState"));
const immutable_1 = require("immutable");
const createRecord = immutable_1.Record({
    errors: immutable_1.List(),
    validationState: ValidationState_1.default.NOT_VALIDATED,
    changed: false,
});
function createInitialFieldState() {
    return createRecord();
}
exports.default = createInitialFieldState;
