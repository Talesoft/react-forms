import React, { HTMLProps } from 'react'
import useFormContext from '../forms/useFormContext'

export type SpanProps = HTMLProps<HTMLSpanElement>

export interface SpanFieldProps extends SpanProps {
    name?: string
}

export default function InputField({ name, ...spanProps }: SpanFieldProps) {
    const { getFieldValue } = useFormContext()
    return <span {...spanProps}>{getFieldValue(name ?? '')}</span>
}
