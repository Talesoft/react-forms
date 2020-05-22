import { PropsWithChildren, useMemo, ReactElement } from 'react'
import useField from './useField'
import { fromJS, List } from 'immutable'

export interface FormFieldMapHelpers {
    childName(path: string): string
    insertBefore(value: any): void
    insertAfter(value: any): void
    remove(): void
    key: number
}

export interface FormFieldArrayDispatchers {
    push(value: any): void
    pop(): void
    unshift(value: any): void
    shift(): void
    map(fn: (helpers: FormFieldMapHelpers) => ReactElement): void
}

export interface FormFieldArrayProps {
    name: string
    children: (dispatchers: FormFieldArrayDispatchers) => ReactElement
}

function isList(value: any): value is List<any> {
    return value instanceof List
}

export default function FormFieldArray({ name, children }: PropsWithChildren<FormFieldArrayProps>) {
    const { immutableValue, setValue } = useField(name)

    if (!isList(immutableValue)) {
        throw new Error(
            `immutableValue needs to be a immutable.js List. ` +
                `You probably don't have an array stored in ${name}'s values`,
        )
    }

    const dispatchers = useMemo(
        () => ({
            push: (value: any) => setValue(immutableValue.push(fromJS(value))),
            pop: () => setValue(immutableValue.pop()),
            unshift: (value: any) => setValue(immutableValue.unshift(fromJS(value))),
            shift: () => setValue(immutableValue.shift()),
            insert: (key: number, value: any) => setValue(immutableValue.insert(key, value)),
            remove: (key: number) => setValue(immutableValue.remove(key)),
            map: (fn: (helpers: FormFieldMapHelpers) => ReactElement) =>
                immutableValue.map((_0, key) => {
                    const childName = (path: string) => `${name}[${key}].${path}`
                    const insertBefore = (value: any) => setValue(immutableValue.insert(key - 1, value))
                    const insertAfter = (value: any) => setValue(immutableValue.insert(key, value))
                    const remove = () => setValue(immutableValue.remove(key))
                    return fn({ childName, key, insertBefore, insertAfter, remove })
                }),
        }),
        [immutableValue],
    )
    return children(dispatchers)
}
