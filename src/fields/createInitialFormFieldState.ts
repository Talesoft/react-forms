import ValidationState from '../ValidationState'
import FormFieldState from './FormFieldState'
import { Record, List } from 'immutable'

const createRecord = Record({
    errors: List(),
    validationState: ValidationState.NOT_VALIDATED,
    changed: false,
} as Readonly<FormFieldState>)

export default function createInitialFormFieldState() {
    return createRecord()
}
