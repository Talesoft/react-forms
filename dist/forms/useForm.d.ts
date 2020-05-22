import FormOptions from './FormOptions';
import FormStateRecord from './FormStateRecord';
export default function useForm<TValue>(options: FormOptions<TValue>): {
    validate: () => Promise<{
        readonly value: TValue;
        readonly validationState: import("./ValidationState").default.VALID | import("./ValidationState").default.INVALID;
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
    state: FormStateRecord<TValue>;
};
