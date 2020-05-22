import { PropsWithChildren, ReactElement } from 'react'
import useFieldArray, { FieldArrayDispatchers } from './useFieldArray'

export interface FieldArrayProps {
    name: string
    children: (dispatchers: FieldArrayDispatchers) => ReactElement
}

export default function FieldArray({ name, children }: PropsWithChildren<FieldArrayProps>) {
    const dispatchers = useFieldArray(name)
    return children(dispatchers)
}
