import FormError from './FormError'

export default interface FormOptions<TValue extends {}> {
    readonly initialValue: TValue
    readonly onSubmit?: (value: TValue) => void | Promise<void>
    readonly validate?: (value: TValue) => { [path: string]: FormError[] } | Promise<{ [path: string]: FormError[] }>
}
