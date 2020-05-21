import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/darkly/bootstrap.min.css'

import React, { useMemo, useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import Form from '../../src/forms/Form'
import InputField from '../../src/fields/InputField'
import SelectField from '../../src/fields/SelectField'
import TextAreaField from '../../src/fields/TextAreaField'
import SpanField from '../../src/fields/SpanField'
import FormElement from '../../src/forms/FormElement'
import useFormContext from '../../src/forms/useFormContext'

export default {
    title: 'Form',
    component: Form,
}

const ChangeWatcher = () => {
    const { state } = useFormContext()
    useEffect(() => {
        action('change')(state.get('value').toJS())
    }, [state.get('value')])
    return null
}

export const BasicForm = () => {
    const initialValue = useMemo(() => ({
        exampleText: 'Example Text',
        exampleOption: 'option-three',
        exampleMultiOption: ['option-three', 'option-five'],
        exampleChecked: true,
        exampleRadioValue: 'c',
        exampleTime: 6000,
        exampleDate: Math.floor(Date.now() / 1000),
        exampleDateTime: Math.floor(Date.now() / 1000),
        exampleTextArea: 'Some content',
    }), [])
    return (
        <div className="container mt-5 mb-5">
            <Form initialValue={initialValue} onSubmit={action('submit')}>
                <ChangeWatcher />
                <FormElement>
                    <div className="form-group">
                        <label htmlFor="exampleText">Text Input:</label>
                        <InputField className="form-control" id="exampleText" name="exampleText" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleOption">Select:</label>
                        <SelectField className="form-control" id="exampleOption" name="exampleOption">
                            <option value="option-one">Option One</option>
                            <option value="option-twp">Option Two</option>
                            <option value="option-three">Option Three</option>
                        </SelectField>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleMultiOption">Multi Select:</label>
                        <SelectField multiple className="form-control" id="exampleMultiOption" name="exampleMultiOption">
                            <option value="option-one">Option One</option>
                            <option value="option-twp">Option Two</option>
                            <option value="option-three">Option Three</option>
                            <option value="option-four">Option Four</option>
                            <option value="option-five">Option Five</option>
                        </SelectField>
                    </div>
                    <div className="form-check">
                        <InputField className="form-check-input" type="checkbox" id="exampleChecked" name="exampleChecked" />
                        <label className="form-check-label" htmlFor="exampleChecked"> 
                            Check this or don't
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <InputField className="form-check-input" type="radio" id="exampleRadioValueA" name="exampleRadioValue" value="a" />{' '}
                        <label className="form-check-label" htmlFor="exampleRadioValueA">
                            A
                        </label>{' '}
                        <InputField className="form-check-input" type="radio" id="exampleRadioValueB" name="exampleRadioValue" value="b" />{' '}
                        <label className="form-check-label" htmlFor="exampleRadioValueB"> 
                            B
                        </label>{' '}
                        <InputField className="form-check-input" type="radio" id="exampleRadioValueC" name="exampleRadioValue" value="c" />{' '}
                        <label className="form-check-label" htmlFor="exampleRadioValueC"> 
                            C
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleDate">Time:</label>
                        <InputField className="form-control" type="time" id="exampleTime" name="exampleTime" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleDate">Date:</label>
                        <InputField className="form-control" type="date" id="exampleDate" name="exampleDate" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleDateTime">Datetime Local:</label>
                        <InputField className="form-control" type="datetime-local" id="exampleDateTime" name="exampleDateTime" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextArea">Text area:</label>
                        <TextAreaField className="form-control" id="exampleTextArea" name="exampleTextArea" rows={6} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </FormElement>
            </Form>
        </div>
    )
}

export const NestedForm = () => {
    const initialValue = useMemo(() => ({
        firstName: 'Bob',
        lastName: 'Kelsoe',
        snack: 'Muffin',
        age: 38,
        contactInfos: {
            linkedIn: 'https://linkedin.com/BobKelsoe',
            twitter: 'https://twitter.com/BobKelsoe',
            github: 'https://github.com/BobKelsoe',
        },
    }), [])
    return (
        <div className="container mt-5 mb-5">
            <Form initialValue={initialValue} onSubmit={action('submit')}>
                <ChangeWatcher />
                <FormElement>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <InputField className="form-control" id="firstName" name="firstName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <InputField className="form-control" id="lastName" name="lastName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <InputField className="form-control" id="age" name="age" />
                    </div>
                    <div className="form-group">
                        <label>Snack:</label>
                        <div>
                            <SpanField name="snack" />
                        </div>
                    </div>
                    <fieldset>
                        <legend>Contact Info</legend>
                        <div className="form-group">
                            <label htmlFor="contactInfosLinkedIn">LinkedIn:</label>
                            <InputField className="form-control" id="contactInfosLinkedIn" name="contactInfos.linkedIn" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactInfosTwitter">Twitter:</label>
                            <InputField className="form-control" id="contactInfosTwitter" name="contactInfos.twitter" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactInfosGithub">GitHub:</label>
                            <InputField className="form-control" id="contactInfosGithub" name="contactInfos.github" />
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </FormElement>
            </Form>
        </div>
    )
}

export const NestedArrayForm = () => {
    const initialValue = useMemo(() => ({
        firstName: 'Bob',
        lastName: 'Kelsoe',
        snack: 'Muffin',
        age: 38,
        contactInfos: [
            { type: 'linkedIn', value: 'https://linkedin.com/BobKelsoe' },
            { type: 'twitter', value: 'https://twitter.com/BobKelsoe' },
            { type: 'github', value: 'https://github.com/BobKelsoe' },
        ],
    }), [])
    return (
        <div className="container mt-5 mb-5">
            <Form initialValue={initialValue} onSubmit={action('submit')}>
                <ChangeWatcher />
                <FormElement>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <InputField className="form-control" id="firstName" name="firstName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <InputField className="form-control" id="lastName" name="lastName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <InputField className="form-control" id="age" name="age" />
                    </div>
                    <div className="form-group">
                        <label>Snack:</label>
                        <div>
                            <SpanField name="snack" />
                        </div>
                    </div>
                    <fieldset>
                        <legend>Contact Info</legend>
                        <div className="form-group">
                            <label htmlFor="contactInfosLinkedIn">LinkedIn:</label>
                            <InputField className="form-control" id="contactInfosLinkedIn" name="contactInfos.linkedIn" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactInfosTwitter">Twitter:</label>
                            <InputField className="form-control" id="contactInfosTwitter" name="contactInfos.twitter" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactInfosGithub">GitHub:</label>
                            <InputField className="form-control" id="contactInfosGithub" name="contactInfos.github" />
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </FormElement>
            </Form>
        </div>
    )
}
