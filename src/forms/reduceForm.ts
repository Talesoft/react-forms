import FormStateAction from './FormStateAction'
import FormStateRecord from './FormStateRecord'
import createInitialFieldState from '../fields/createInitialFieldState'
import { List } from 'immutable'
import ValidationState from './ValidationState'
import createInitialFormState from './createInitialFormState'

export default function reduceForm<TValue>(state: FormStateRecord<TValue>, action: FormStateAction) {
    console.log('reduceForm', state, action)
    switch (action.type) {
        case 'reset':
            return createInitialFormState(state.get('initialValue'))
        case 'beginSubmit':
            return state.set('submitting', true)
        case 'finishSubmit':
            return state.merge({ submitted: true, submitting: false })
        case 'setFieldValue':
            const path = action.path.split('.')
            return state
                .update('value', value => value.setIn(path, action.value))
                .update('fieldStates', fieldStates =>
                    fieldStates.update(action.path, fieldState => fieldState.set('changed', true)),
                )
        case 'registerField':
            return state.update('fieldStates', fieldStates => fieldStates.set(action.path, createInitialFieldState()))
        case 'unregisterField':
            return state.update('fieldStates', fieldStates => fieldStates.delete(action.path))
        case 'setFieldErrors':
            const fieldStates = state.get('fieldStates')
            if (!fieldStates.has(action.path)) {
                throw new Error(`Failed to set errors for field ${action.path}: Field is not registered`)
            }
            const errors = List(action.errors)
            const validationState = (errors.size ?? 0) > 0 ? ValidationState.INVALID : ValidationState.VALID
            const newFieldStates = fieldStates.update(action.path, fieldState =>
                fieldState.merge({
                    errors,
                    validationState: validationState,
                }),
            )
            return state.merge({
                fieldStates: newFieldStates,
                validationState:
                    validationState === ValidationState.INVALID
                        ? ValidationState.INVALID
                        : state.get('validationState') === ValidationState.NOT_VALIDATED
                        ? ValidationState.VALID
                        : validationState,
            })
    }
}
