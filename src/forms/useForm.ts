import FormOptions from './FormOptions'
import createInitialFormState from './createInitialFormState'
import { useReducer, useMemo, Reducer } from 'react'
import reduceForm from './reduceForm'
import FormStateAction from './FormStateAction'
import FormStateRecord from './FormStateRecord'
import createFormStateDispatchers from './createFormStateDispatchers'

export default function useForm<TValue>(options: FormOptions<TValue>) {
    const initialFormState = useMemo(() => createInitialFormState(options.initialValue), [options.initialValue])
    const [state, dispatch] = useReducer<Reducer<FormStateRecord<TValue>, FormStateAction>>(
        reduceForm,
        initialFormState,
    )
    const dispatchers = useMemo(() => createFormStateDispatchers(options, state, dispatch), [options, state, dispatch])
    return useMemo(
        () => ({
            state,
            ...dispatchers,
        }),
        [state, dispatchers],
    )
}
