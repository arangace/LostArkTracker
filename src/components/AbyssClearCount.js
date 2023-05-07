import React from "react";
import { Formik, Field, Form } from "formik";
const AbyssClearCount = () => {
  return (
    <Formik
      initialValues={{
        toggle: false,
        checked: [],
      }}
    >
      {({ values }) => (
        <Form>
          <label>
            <Field type="checkbox" name="toggle" />
            {`${values.toggle}`}
          </label>
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
  );
};

export default AbyssClearCount;
