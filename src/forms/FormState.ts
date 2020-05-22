import ValidationState from '../ValidationState'
import FieldStateMap from '../fields/FieldStateMap'
import { Map } from 'immutable'

export default interface FormState<TValue> {
    readonly initialValue: TValue
    readonly value: Map<string, any>
    readonly submitting: boolean
    readonly submitted: boolean
    readonly validationState: ValidationState
    readonly fieldStates: FieldStateMap
}
