"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createInitialFieldState_1 = __importDefault(require("../fields/createInitialFieldState"));
const immutable_1 = require("immutable");
const ValidationState_1 = __importDefault(require("./ValidationState"));
const createInitialFormState_1 = __importDefault(require("./createInitialFormState"));
function reduceForm(state, action) {
    var _a;
    console.log('reduceForm', state, action);
    switch (action.type) {
        case 'reset':
            return createInitialFormState_1.default(state.get('initialValue'));
        case 'beginSubmit':
            return state.set('submitting', true);
        case 'finishSubmit':
            return state.merge({ submitted: true, submitting: false });
        case 'setFieldValue':
            const path = action.path.split('.');
            return state
                .update('value', value => value.setIn(path, action.value))
                .update('fieldStates', fieldStates => fieldStates.update(action.path, fieldState => fieldState.set('changed', true)));
        case 'registerField':
            return state.update('fieldStates', fieldStates => fieldStates.set(action.path, createInitialFieldState_1.default()));
        case 'unregisterField':
            return state.update('fieldStates', fieldStates => fieldStates.delete(action.path));
        case 'setFieldErrors':
            const fieldStates = state.get('fieldStates');
            if (!fieldStates.has(action.path)) {
                throw new Error(`Failed to set errors for field ${action.path}: Field is not registered`);
            }
            const errors = immutable_1.List(action.errors);
            const validationState = ((_a = errors.size) !== null && _a !== void 0 ? _a : 0) > 0 ? ValidationState_1.default.INVALID : ValidationState_1.default.VALID;
            const newFieldStates = fieldStates.update(action.path, fieldState => fieldState.merge({
                errors,
                validationState: validationState,
            }));
            return state.merge({
                fieldStates: newFieldStates,
                validationState: validationState === ValidationState_1.default.INVALID
                    ? ValidationState_1.default.INVALID
                    : state.get('validationState') === ValidationState_1.default.NOT_VALIDATED
                        ? ValidationState_1.default.VALID
                        : validationState,
            });
    }
}
exports.default = reduceForm;
