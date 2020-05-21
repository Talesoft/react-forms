import React, { HTMLProps } from 'react'
import useField from './useField'

export type InputProps = HTMLProps<HTMLInputElement>

function toScriptValue(target: HTMLInputElement) {
    switch (target.type) {
        case 'file':
            return target.multiple ? target.files : target.files?.[0] ?? null
        case 'checkbox':
            return target.checked
        case 'number':
        case 'range':
            return parseInt(target.value, 10)
        case 'time':
        case 'date':
        case 'datetime-local':
            return Math.floor(target.valueAsNumber / 1000)
        default:
            return target.value
    }
}

function toFieldValueProps(inputProps: InputProps, value: any) {
    switch (inputProps.type) {
        case 'file':
            return {}
        case 'checkbox':
            return { checked: !!value }
        case 'radio':
            return { checked: value === inputProps.value }
        case 'number':
        case 'range':
            return { value: parseInt(value, 10) }
        case 'time':
            return { value: new Date((value as number) * 1000).toISOString().substr(11, 8) }
        case 'date':
            return { value: new Date((value as number) * 1000).toISOString().substr(0, 10) }
        case 'datetime-local':
            return { value: new Date((value as number) * 1000).toISOString().substr(0, 19) }
        default:
            return { value: value as string | number }
    }
}

export default function InputField(props: InputProps) {
    const { value, setValue } = useField<string | number | boolean | File | FileList>(props.name ?? '')
    const valueProps = toFieldValueProps(props, value)
    return <input {...props} {...valueProps} onChange={event => setValue(toScriptValue(event.target))} />
}
