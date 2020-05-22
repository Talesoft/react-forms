import ValidationState from './ValidationState'
import { Record, Map, fromJS } from 'immutable'
import FormState from './FormState'

const createRecord = Record({
    initialValue: undefined,
    value: Map(),
    submitting: false,
    submitted: false,
    validationState: ValidationState.NOT_VALIDATED,
    fieldStates: Map(),
} as Readonly<FormState<any>>)

export default function createInitialFormState<TValue>(initialValue: TValue) {
    return createRecord({ initialValue, value: fromJS(initialValue) }) as Record<Readonly<FormState<TValue>>>
}
