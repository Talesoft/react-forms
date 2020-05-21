import { Record } from 'immutable'
import FormState from './FormState'

type FormStateRecord<TValue> = Record<FormState<TValue>>
export default FormStateRecord
