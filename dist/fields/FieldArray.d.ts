import { PropsWithChildren, ReactElement } from 'react';
import { FieldArrayDispatchers } from './useFieldArray';
export interface FieldArrayProps {
    name: string;
    children: (dispatchers: FieldArrayDispatchers) => ReactElement;
}
export default function FieldArray({ name, children }: PropsWithChildren<FieldArrayProps>): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
