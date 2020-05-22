import FormStateDispatch from './FormStateDispatch'
import FormStateRecord from './FormStateRecord'
import FormOptions from './FormOptions'
import ValidationState from './ValidationState'

export default function createFormStateDispatchers<TValue>(
    options: FormOptions<TValue>,
    state: FormStateRecord<TValue>,
    dispatch: FormStateDispatch,
) {
    function getValue() {
        return state.get('value').toJS() as TValue
    }
    async function validate() {
        const value = getValue()
        if (!options.validate) {
            return { value, validationState: ValidationState.VALID, errorList: {} } as const
        }
        const errorList = await options.validate(value)
        const entries = Object.entries(errorList)
        entries.forEach(([path, errors]) => dispatch({ type: 'setFieldErrors', path, errors }))
        const validationState = entries.length > 0 ? ValidationState.INVALID : ValidationState.VALID
        return { value, validationState, errorList } as const
    }
    function registerField(path: string) {
        dispatch({ type: 'registerField', path })
    }
    function unregisterField(path: string) {
        dispatch({ type: 'unregisterField', path })
    }
    function getFieldValue(path: string) {
        return state.get('value').getIn(path.split('.'))
    }
    function setFieldValue(path: string, value: any) {
        dispatch({ type: 'setFieldValue', path, value })
    }
    function reset() {
        dispatch({ type: 'reset' })
    }
    function beginSubmit() {
        dispatch({ type: 'beginSubmit' })
    }
    function finishSubmit() {
        dispatch({ type: 'finishSubmit' })
    }
    async function submit() {
        beginSubmit()
        const { value, validationState } = await validate()
        if (validationState === ValidationState.VALID) {
            await options.onSubmit?.(value)
        }
        finishSubmit()
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
    }
}
