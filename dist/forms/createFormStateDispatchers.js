"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationState_1 = __importDefault(require("./ValidationState"));
function createFormStateDispatchers(options, state, dispatch) {
    function getValue() {
        return state.get('value').toJS();
    }
    function validate() {
        return __awaiter(this, void 0, void 0, function* () {
            const value = getValue();
            if (!options.validate) {
                return { value, validationState: ValidationState_1.default.VALID, errorList: {} };
            }
            const errorList = yield options.validate(value);
            const entries = Object.entries(errorList);
            entries.forEach(([path, errors]) => dispatch({ type: 'setFieldErrors', path, errors }));
            const validationState = entries.length > 0 ? ValidationState_1.default.INVALID : ValidationState_1.default.VALID;
            return { value, validationState, errorList };
        });
    }
    function registerField(path) {
        dispatch({ type: 'registerField', path });
    }
    function unregisterField(path) {
        dispatch({ type: 'unregisterField', path });
    }
    function getFieldValue(path) {
        return state.get('value').getIn(path.split('.'));
    }
    function setFieldValue(path, value) {
        dispatch({ type: 'setFieldValue', path, value });
    }
    function reset() {
        dispatch({ type: 'reset' });
    }
    function beginSubmit() {
        dispatch({ type: 'beginSubmit' });
    }
    function finishSubmit() {
        dispatch({ type: 'finishSubmit' });
    }
    function submit() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            beginSubmit();
            const { value, validationState } = yield validate();
            if (validationState === ValidationState_1.default.VALID) {
                yield ((_a = options.onSubmit) === null || _a === void 0 ? void 0 : _a.call(options, value));
            }
            finishSubmit();
        });
    }
    return {
        validate,
        registerField,
        unregisterField,
        getFieldValue,
        setFieldValue,
        reset,
        beginSubmit,
        finishSubmit,
        submit,
    };
}
exports.default = createFormStateDispatchers;
