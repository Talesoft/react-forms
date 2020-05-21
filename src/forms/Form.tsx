import FormOptions from './FormOptions'
import React, { PropsWithChildren, useMemo } from 'react'
import useForm from './useForm'
import FormContext from './FormContext'

export type FormProps<TValue> = FormOptions<TValue>

export default function Form<TValue extends {}>({
    initialValue,
    onSubmit,
    validate,
    children,
}: PropsWithChildren<FormProps<TValue>>) {
    const options = useMemo(() => ({ initialValue, onSubmit, validate }), [initialValue, onSubmit, validate])
    const form = useForm(options)
    return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}
