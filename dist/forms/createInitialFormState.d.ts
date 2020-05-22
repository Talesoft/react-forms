import { Record } from 'immutable';
import FormState from './FormState';
export default function createInitialFormState<TValue>(initialValue: TValue): Record<Readonly<FormState<TValue>>>;
