import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
const AbyssClearCount = () => {
    const [abyssClear, setabyssClear] = useState()
    const handleError = (error) => {
        console.log(error)
    }
    const handleChange = (value) => {
        console.log(value)
    }
    const handleSubmit = (value) => {
        console.log(value)
        alert(JSON.stringify(value, null, 2));
    }
    return (
        <div>
            <Formik
                initialValues={{
                    toggle: false,
                    checked: [],
                }}
            >
                {({ values }) => (
                    <Form>
                        {/* 
            This first checkbox will result in a boolean value being stored. Note that the `value` prop
            on the <Field/> is omitted
          */}
                        <label>
                            <Field type="checkbox" name="toggle" />
                            {`${values.toggle}`}
                        </label>
                        {/* 
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
                        <div id="checkbox-group">Checked</div>
                        <div role="group" aria-labelledby="checkbox-group">
                            <label>
                                <Field type="checkbox" name="one" value="One" />
                                One
                            </label>
                            <label>
                                <Field type="checkbox" name="two" value="Two" />
                                Two
                            </label>
                            <label>
                                <Field type="checkbox" name="three" value="Three" />
                                Three
                            </label>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AbyssClearCount