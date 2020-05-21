import createInitialFormState from './createInitialFormState'
import { createContext } from 'react'
import createFormStateDispatchers from './createFormStateDispatchers'
import FormOptions from './FormOptions'

const initialFormOptions = { initialValue: {} } as FormOptions<any>
const initialFormState = createInitialFormState(initialFormOptions.initialValue)
const FormContext = createContext({
    state: initialFormState,
    ...createFormStateDispatchers(initialFormOptions, initialFormState, () => undefined as void),
})
export default FormContext
