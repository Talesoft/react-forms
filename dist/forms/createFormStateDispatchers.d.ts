import FormStateDispatch from './FormStateDispatch';
import FormStateRecord from './FormStateRecord';
import FormOptions from './FormOptions';
import ValidationState from './ValidationState';
export default function createFormStateDispatchers<TValue>(options: FormOptions<TValue>, state: FormStateRecord<TValue>, dispatch: FormStateDispatch): {
    validate: () => Promise<{
        readonly value: TValue;
        readonly validationState: ValidationState.VALID | ValidationState.INVALID;
        readonly errorList: {
            [path: string]: import("./FormError").default<import("./FormErrorParameterMap").default>[];
        } | {
            [path: string]: import("./FormError").default<import("./FormErrorParameterMap").default>[];
        };
    }>;
    registerField: (path: string) => void;
    unregisterField: (path: string) => void;
    getFieldValue: (path: string) => any;
    setFieldValue: (path: string, value: any) => void;
    reset: () => void;
    beginSubmit: () => void;
    finishSubmit: () => void;
    submit: () => Promise<void>;
};
