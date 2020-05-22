import FormErrorParameterMap from './FormErrorParameterMap';
export default interface FormError<TParameters extends FormErrorParameterMap = FormErrorParameterMap> {
    readonly message: string;
    readonly parameters: TParameters;
}
