import React, { PropsWithChildren, FormEvent, useCallback, HTMLAttributes } from 'react'
import useFormContext from './useFormContext'

export type FormProps = HTMLAttributes<HTMLFormElement>

export default function FormElement({ children, ...formProps }: PropsWithChildren<FormProps>) {
    const { submit } = useFormContext()
    const onSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault()
            submit()
        },
        [submit],
    )
    return (
        <form noValidate onSubmit={onSubmit} {...formProps}>
            {children}
        </form>
    )
}
