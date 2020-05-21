import { PropsWithChildren, useMemo } from 'react'
import useField from './useField'

export interface FormFieldArrayProps {
    name: string
}

export default function FormFieldArray({ name }: PropsWithChildren<FormFieldArrayProps>) {
    const { value, setValue } = useField(name)
    const dispatchers = useMemo(() => ({
        addValue: (value: any) => setValue()
    }), [])
}
