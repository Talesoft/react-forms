import ValidationState from '../forms/ValidationState';
import FormErrorList from '../forms/FormErrorList';
export default interface FieldState {
    errors: FormErrorList;
    validationState: ValidationState;
    changed: boolean;
}
