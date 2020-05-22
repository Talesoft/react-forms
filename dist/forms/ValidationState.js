"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationState;
(function (ValidationState) {
    ValidationState[ValidationState["NOT_VALIDATED"] = 0] = "NOT_VALIDATED";
    ValidationState[ValidationState["VALID"] = 1] = "VALID";
    ValidationState[ValidationState["INVALID"] = 2] = "INVALID";
})(ValidationState || (ValidationState = {}));
exports.default = ValidationState;
