import { Field, } from "formik";
const ModalItem = (props) => {
  return (
    <div>
      <label>
        <Field type="radio" name={props.tasks.label} value="1" />
        One
      </label>
      <label>
        <Field type="radio" name={props.tasks.label} value="2" />
        Two
      </label>
      {props.tasks.totalClears === 3 ? <label>
        <Field type="radio" name={props.tasks.label} value="3" />
        Three
      </label> : ""}

      <label>
        <Field type="radio" name={props.tasks.label} value="0" />
        None
      </label>
    </div>
  );
};

export default ModalItem;
