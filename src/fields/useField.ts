import { useEffect, useMemo } from 'react'
import useFormContext from '../forms/useFormContext'
import { isImmutable, fromJS } from 'immutable'

export default function useField<TValue>(path: string) {
    const { registerField, unregisterField, getFieldValue, setFieldValue } = useFormContext()
    useEffect(() => {
        registerField(path)
        return () => unregisterField(path)
    }, [path])
    const value = getFieldValue(path)
    return useMemo(
        () =>
            ({
                immutableValue: value,
                value: (isImmutable(value) ? value.toJS() : value) as TValue,
                setValue: (newValue: any) => setFieldValue(path, fromJS(newValue)),
            } as const),
        [value, setFieldValue, path],
    )
}
