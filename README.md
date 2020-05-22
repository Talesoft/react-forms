Talesoft React Forms
===================

What is it
----------

A form handling library for React very similar to
Formik.

It's laid out to be performant and thus uses Faceboook's
ImmutableJS internally to handle the whole form state.

It also primarily uses hooks and functional components.

You don't need to know anything about the ImmutableJS
API, it's completely hidden in the features of this library.

Features
--------

- React & React Native support.
- Hooks to easily build custom components for it.
- Blazing fast. Got a form with over 300 fields? No problem, thanks to ImmutableJS.
- All HTML inputs available as fully integrated and easy to use components.
- Validation in-built, validator-agnostic.

Install
-------

Use NPM to install the package

```bash
npm i @talesoft/react-forms
```

TypeScript typings are included (No `@types/*` package needed)

How to use it
-------------

**Basic Login Form**

```jsx
import { Form, FormElement, InputField } from '@talesoft/react-forms'
import React, { useMemo } from 'react'

function MyForm() {
    const initialValue = useMemo(() => ({
        email: '',
        password: '',
    }), [])

    function onSubmit(value) {
        myApi.tokens.create({
            email: value.email,
            password: value.password,
        })
    }

    return (
        {/* This is the core of a form */}
        <Form initialValue={initialValue} onSubmit={onSubmit}>
            {/* The HTML Form element */}
            <FormElement>
                {/* This acts like a normal HTML <input /> */}
                <InputField type="email" name="email" />

                <InputField type="password" name="password" />

                <button type="submit">Login</button>
            </FormElement>
        </Form>
    )
}
```

**Nested Form**

```jsx
import { Form, FormElement, InputField } from '@talesoft/react-forms'
import React, { useMemo } from 'react'

function MyForm() {
    const initialValue = useMemo(() => ({
        firstName: 'John',
        lastName: 'Doe',
        social: {
            linkedIn: '',
            twitter: '',
            facebook: '',
        },
    }), [])

    function onSubmit(value) {
        myApi.users.update(value)
    }

    return (
        <Form initialValue={initialValue} onSubmit={onSubmit}>
            <FormElement>
                <InputField name="firstName" />
                <InputField name="lastName" />

                <InputField name="social.linkedIn" />
                <InputField name="social.twitter" />
                <InputField name="social.facebook" />

                <button type="submit">Update</button>
            </FormElement>
        </Form>
    )
}
```

**Form Arrays**

```jsx
import {
    Form,
    FormElement,
    InputField,
    FieldArray,
    SelectField
} from '@talesoft/react-forms'
import React, { useMemo } from 'react'

function MyForm() {
    const initialValue = useMemo(() => ({
        address: '',
        openingHours: [
            {
                weekday: 'mo',
                startTime: '10:30:00',
                endTime: '18:30:00',
            },
        ]
    }), [])

    function onSubmit(value) {
        myApi.users.update(value)
    }

    return (
        <Form initialValue={initialValue} onSubmit={onSubmit}>
            <FormElement>
                <InputField name="address" />
                
                <h3>Opening Hours</h3>
                <FieldArray name="openingHours">
                    {({ map, push }) => (
                        <div>
                            {map(({ childName, remove }) => (
                                <div>
                                    <SelectField name={childName('weekday')}>
                                        <option value="mo">Monday</option>
                                        <option value="tu">Tuesday</option>
                                        <option value="we">Wednesday</option>
                                        {/* etc.. */}
                                    </SelectField>
                                    <InputField type="time" name={childName('startTime')} />
                                    <InputField type="time" name={childName('endTime')} />
                                </div>
                            ))}
                            <button type="button" onClick={() => push(initialValue)}>
                                Add another weekday
                            </button>
                        </div>
                    )}
                </FieldArray>

                <button type="submit">Update</button>
            </FormElement>
        </Form>
    )
}
```

**Too bulky? Use hooks to build own components!**

```jsx
// OpeningHoursField.jsx
import React, { useMemo } from 'react'
import { useFieldArray } from '@talesoft/react-forms'

export default function OpeningHoursField({ name }) {
    const { map, push } = useFieldArray(name)
    return (
        <div>
            {map(({ childName, remove }) => (
                <div>
                    <SelectField name={childName('weekday')}>
                        <option value="mo">Monday</option>
                        <option value="tu">Tuesday</option>
                        <option value="we">Wednesday</option>
                        {/* etc.. */}
                    </SelectField>
                    <InputField type="time" name={childName('startTime')} />
                    <InputField type="time" name={childName('endTime')}/>
                </div>
            ))}
            <button type="button" onClick={() => push(initialValue)}>
                Add another weekday
            </button>
        </div>
    )
}
```

```jsx
// MyForm.jsx
import {
    Form,
    FormElement,
} from '@talesoft/react-forms'
import OpeningHoursField from './OpeningHoursField'
import React, { useMemo } from 'react'

function MyForm() {
    const initialValue = useMemo(() => ({
        address: '',
        openingHours: [
            {
                weekday: 'mo',
                startTime: '10:30:00',
                endTime: '18:30:00',
            },
        ]
    }), [])

    function onSubmit(value) {
        myApi.users.update(value)
    }

    return (
        <Form initialValue={initialValue} onSubmit={onSubmit}>
            <FormElement>
                <InputField name="address" />
                
                <h3>Opening Hours</h3>
                <OpeningHoursField name="openingHours" />

                <button type="submit">Update</button>
            </FormElement>
        </Form>
    )
}
```