/// <reference types="react" />
declare const FormContext: import("react").Context<{
    validate: () => Promise<{
        readonly value: any;
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
    state: import("immutable").Record<Readonly<import("./FormState").default<any>>>;
}>;
export default FormContext;
