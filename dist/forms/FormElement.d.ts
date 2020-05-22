import { PropsWithChildren, HTMLAttributes } from 'react';
export declare type FormProps = HTMLAttributes<HTMLFormElement>;
export default function FormElement({ children, ...formProps }: PropsWithChildren<FormProps>): JSX.Element;
