import React from "react";
import { Field, reduxForm } from "redux-form";
import BwmInput from "components/shared/form/BwmInput";
import BwmResErrors from "components/shared/form/BwmResErrors";
import BwmTextArea from "components/shared/form/BwmTextArea";
import BwmFileUpload from "components/shared/form/BwmFileUpload";
import BwmSelect from "components/shared/form/BwmSelect";

const RentalCreateForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    submitCb,
    valid,
    errors,
    options
  } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        label="Title"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="description"
        type="text"
        label="Description"
        className="form-control"
        rows="6"
        component={BwmTextArea}
      />

      <Field
        name="city"
        type="text"
        label="City"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="street"
        type="text"
        label="Street"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="category"
        type="text"
        label="Category"
        className="form-control"
        options={options}
        component={BwmSelect}
      />

      <Field name="image" label="Image" component={BwmFileUpload} />

      <Field
        name="bedrooms"
        type="number"
        label="Bedrooms"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="dailyRate"
        type="text"
        label="Daily Rate"
        className="form-control"
        symbol="$"
        component={BwmInput}
      />

      <Field
        name="shared"
        type="checkbox"
        label="Shared"
        className="form-control"
        component={BwmInput}
      />

      <button
        type="submit"
        disabled={!valid || pristine || submitting}
        className="btn btn-bwm btn-form"
      >
        Submit
      </button>
      <BwmResErrors errors={errors} />
    </form>
  );
};

// const validate = values => {
//   const errors = {};

//   if (values.username && values.username.length < 4) {
//     errors.username = "Username min length is 4 characters!";
//   }

//   if (!values.email) {
//     errors.email = "Please enter email! Email is required.";
//   }

//   if (!values.passwordConfirmation) {
//     errors.passwordConfirmation = "Please enter password confirmation!";
//   }

//   if (values.password !== values.passwordConfirmation) {
//     errors.password = "Password must be the same.";
//   }

//   return errors;
// };

export default reduxForm({
  form: "rentalCreateForm",
  initialValues: {
    shared: false
  }
})(RentalCreateForm);
