import ValidationState from '../ValidationState'
import FieldState from './FieldState'
import { Record, List } from 'immutable'

const createRecord = Record({
    errors: List(),
    validationState: ValidationState.NOT_VALIDATED,
    changed: false,
} as Readonly<FieldState>)

export default function createInitialFieldState() {
    return createRecord()
}
