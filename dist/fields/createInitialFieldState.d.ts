import FieldState from './FieldState';
import { Record } from 'immutable';
export default function createInitialFieldState(): Record<Readonly<FieldState>> & Readonly<Readonly<FieldState>>;
