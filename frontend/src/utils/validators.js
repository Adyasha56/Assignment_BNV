export const validateUser = (values) => {
  const errors = {};

  if (!values.firstName) errors.firstName = "First name is required";
  if (!values.lastName) errors.lastName = "Last name is required";

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile is required";
  } else if (!/^\d{10}$/.test(values.mobile)) {
    errors.mobile = "Mobile must be 10 digits";
  }

  if (!values.gender) errors.gender = "Gender is required";
  if (!values.status) errors.status = "Status is required";

  return errors;
};

export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};