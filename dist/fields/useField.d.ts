export default function useField<TValue>(path: string): {
    readonly immutableValue: any;
    readonly value: TValue;
    readonly setValue: (newValue: any) => void;
};
