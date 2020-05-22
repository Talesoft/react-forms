import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/darkly/bootstrap.min.css'

import React, { useMemo, useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import Form from '../../src/forms/Form'
import InputField from '../../src/fields/InputField'
import FieldArray from '../../src/fields/FieldArray'
import FormElement from '../../src/forms/FormElement'
import useFormContext from '../../src/forms/useFormContext'

export default {
    title: 'Form Field Array',
    component: FieldArray,
}

const ChangeWatcher = () => {
    const { state } = useFormContext()
    useEffect(() => {
        action('change')(state.get('value').toJS())
    }, [state.get('value')])
    return null
}

export const BasicArrayExample = () => {
    const initialValue = useMemo(() => ({
        items: [
            { title: 'Buy eggs', finished: true },
            { title: 'Buy milk', finished: false },
            { title: 'Wash car', finished: false },
        ],
    }), [])
    return (
        <div className="container mt-5 mb-5">
            <Form initialValue={initialValue} onSubmit={action('submit')}>
                <ChangeWatcher />
                <FormElement>
                    <FieldArray name="items">
                        {({ map, push, unshift }) => (
                            <>
                                <button onClick={() => unshift({ title: '', finished: false })}>Prepend item</button>
                                {map(({ key, childName, remove }) => (
                                    <>
                                        <div className="row">
                                            <div className="form-group form-group-inline" key={key}>
                                                <label htmlFor={`title${key}`}>Task:</label>
                                                <InputField className="form-control" id={`title${key}`} name={childName('title')} />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <InputField className="form-check-input" type="checkbox" id={`finished${key}`} name={childName('finished')} />
                                                <label className="form-check-label" htmlFor={`finished${key}`}> 
                                                    Finished
                                                </label>
                                            </div>
                                            <div className="form-group form-group-inline">
                                                <button onClick={remove}>X</button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                                <button onClick={() => push({ title: '', finished: false })}>Append item</button>
                            </>
                        )}
                    </FieldArray>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </FormElement>
            </Form>
        </div>
    )
}

export const StressTest = () => {
    const initialValue = useMemo(() => ({
        items: Array.from({ length: 50 }, (_, i) => ({ title: `Item ${i}`, finished: true }))
    }), [])
    return (
        <div className="container mt-5 mb-5">
            <Form initialValue={initialValue} onSubmit={action('submit')}>
                <FormElement>
                    <FieldArray name="items">
                        {({ map, push, unshift }) => (
                            <>
                                <button onClick={() => unshift(...Array.from({ length: 50 }, () => ({ title: '', finished: false })))} type="button">
                                    Prepend 50 items
                                </button>
                                {map(({ key, childName, remove }) => (
                                    <>
                                        <div className="row">
                                            <div className="form-group form-group-inline" key={key}>
                                                <label htmlFor={`title${key}`}>Task:</label>
                                                <InputField className="form-control" id={`title${key}`} name={childName('title')} />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <InputField className="form-check-input" type="checkbox" id={`finished${key}`} name={childName('finished')} />
                                                <label className="form-check-label" htmlFor={`finished${key}`}> 
                                                    Finished
                                                </label>
                                            </div>
                                            <div className="form-group form-group-inline">
                                                <button onClick={remove}>X</button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                                <button onClick={() => push(...Array.from({ length: 50 }, () => ({ title: '', finished: false })))} type="button">
                                    Append 50 items
                                </button>
                            </>
                        )}
                    </FieldArray>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </FormElement>
            </Form>
        </div>
    )
}