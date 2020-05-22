import { ReactElement } from 'react';
import { List } from 'immutable';
export interface FieldArrayMapHelpers {
    childName(path: string): string;
    insertBefore(value: any): void;
    insertAfter(value: any): void;
    remove(): void;
    key: number;
}
export interface FieldArrayDispatchers {
    push(...values: any[]): void;
    pop(): void;
    unshift(...values: any[]): void;
    shift(): void;
    map(fn: (helpers: FieldArrayMapHelpers) => ReactElement): void;
}
export default function useFieldArray(name: string): {
    push: (...values: any[]) => void;
    pop: () => void;
    unshift: (...values: any[]) => void;
    shift: () => void;
    insert: (key: number, value: any) => void;
    remove: (key: number) => void;
    map: (fn: (helpers: FieldArrayMapHelpers) => ReactElement) => List<ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>>;
};
