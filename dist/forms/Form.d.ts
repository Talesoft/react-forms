import FormOptions from './FormOptions';
import { PropsWithChildren } from 'react';
export declare type FormProps<TValue> = FormOptions<TValue>;
export default function Form<TValue extends {}>({ initialValue, onSubmit, validate, children, }: PropsWithChildren<FormProps<TValue>>): JSX.Element;
