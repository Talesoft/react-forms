import { HTMLProps } from 'react';
export declare type SpanProps = HTMLProps<HTMLSpanElement>;
export interface SpanFieldProps extends SpanProps {
    name?: string;
}
export default function InputField({ name, ...spanProps }: SpanFieldProps): JSX.Element;
