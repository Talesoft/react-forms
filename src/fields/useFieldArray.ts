import { useMemo, ReactElement } from 'react'
import useField from './useField'
import { fromJS, List } from 'immutable'

export interface FieldArrayMapHelpers {
    childName(path: string): string
    insertBefore(value: any): void
    insertAfter(value: any): void
    remove(): void
    key: number
}

export interface FieldArrayDispatchers {
    push(...values: any[]): void
    pop(): void
    unshift(...values: any[]): void
    shift(): void
    map(fn: (helpers: FieldArrayMapHelpers) => ReactElement): void
}

function isList(value: any): value is List<any> {
    return value instanceof List
}

export default function useFieldArray(name: string) {
    const { immutableValue, setValue } = useField(name)

    if (!isList(immutableValue)) {
        throw new Error(
            `immutableValue needs to be a immutable.js List. ` +
                `You probably don't have an array stored in ${name}'s value`,
        )
    }

    return useMemo(
        () => ({
            push: (...values: any[]) => setValue(immutableValue.push(...values.map((value: any) => fromJS(value)))),
            pop: () => setValue(immutableValue.pop()),
            unshift: (...values: any[]) =>
                setValue(immutableValue.unshift(...values.map((value: any) => fromJS(value)))),
            shift: () => setValue(immutableValue.shift()),
            insert: (key: number, value: any) => setValue(immutableValue.insert(key, value)),
            remove: (key: number) => setValue(immutableValue.remove(key)),
            map: (fn: (helpers: FieldArrayMapHelpers) => ReactElement) =>
                immutableValue.map((_0, key) => {
                    const childName = (path: string) => [name, key, path].join('.')
                    const insertBefore = (value: any) => setValue(immutableValue.insert(key - 1, value))
                    const insertAfter = (value: any) => setValue(immutableValue.insert(key, value))
                    const remove = () => setValue(immutableValue.remove(key))
                    return fn({ childName, key, insertBefore, insertAfter, remove })
                }),
        }),
        [immutableValue],
    )
}
