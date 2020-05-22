import FormStateAction from './FormStateAction';
import FormStateRecord from './FormStateRecord';
export default function reduceForm<TValue>(state: FormStateRecord<TValue>, action: FormStateAction): FormStateRecord<TValue>;
