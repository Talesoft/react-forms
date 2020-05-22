import { Record } from 'immutable';
import FormState from './FormState';
declare type FormStateRecord<TValue> = Record<FormState<TValue>>;
export default FormStateRecord;
