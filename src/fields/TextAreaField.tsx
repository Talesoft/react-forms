import React, { HTMLProps } from 'react'
import useField from './useField'

export type TextAreaProps = HTMLProps<HTMLTextAreaElement>

export default function TextAreaField(props: TextAreaProps) {
    const { value, setValue } = useField<string>(props.name ?? '')
    return <textarea {...props} value={value} onChange={event => setValue(event.target.value)} />
}
