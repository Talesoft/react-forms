import ValidationState from '../ValidationState'
import FormErrorList from '../forms/FormErrorList'

export default interface FormFieldState {
    errors: FormErrorList
    validationState: ValidationState
    changed: boolean
}
