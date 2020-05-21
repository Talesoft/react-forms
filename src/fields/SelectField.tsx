import React, { HTMLProps } from 'react'
import useField from './useField'

export type SelectProps = HTMLProps<HTMLSelectElement>

export default function SelectField(props: SelectProps) {
    const { value, setValue } = useField<string | string[] | number>(props.name ?? '')
    console.log(value)
    return (
        <select
            {...props}
            value={value}
            onChange={event =>
                setValue(
                    props.multiple
                        ? Array.from(event.target.options)
                              .filter(opt => opt.selected)
                              .map(opt => opt.value)
                        : event.target.value,
                )
            }
        />
    )
}
