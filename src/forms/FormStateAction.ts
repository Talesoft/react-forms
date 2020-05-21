import FormError from './FormError'

type FormStateAction =
    | { readonly type: 'reset' }
    | { readonly type: 'beginSubmit' }
    | { readonly type: 'finishSubmit' }
    | { readonly type: 'setFieldValue'; readonly path: string; readonly value: any }
    | { readonly type: 'registerField'; readonly path: string }
    | { readonly type: 'unregisterField'; readonly path: string }
    | { readonly type: 'setFieldErrors'; readonly path: string; readonly errors: FormError[] }
export default FormStateAction
