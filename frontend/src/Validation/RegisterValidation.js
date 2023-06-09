const validate = (values) => {
  const errors = {};

  if (values.firstName === "") {
    errors.firstName = "First name is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.firstName)) {
    errors.firstName = "Only letters and alphabets are allowed";
  }

  if (values.lastName === "") {
    errors.lastName = "Last name is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.lastName)) {
    errors.lastName = "Only letters and alphabets are allowed";
  }

  if (values.email === "") {
    errors.email = "Email is required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid email";
  }

  if (values.mobile === "") {
    errors.mobile = "mobile number is required";
  } else if (!/^\d{10}$/.test(values.mobile)) {
    errors.mobile = "Invalid phone number";
  }

  if (values.gender === "") {
    errors.gender = "Gender is required";
  } else if (!isNaN(values.gender)) {
    errors.gender = "Invalid entry";
  }

  if (values.status === "") {
    errors.status = "Status is required";
  } else if (!isNaN(values.status)) {
    errors.status = "Invalid entry";
  }

  if (values.location === "") {
    errors.location = "Location is required";
  } else if (!isNaN(values.location)) {
    errors.location = "Invalid entry";
  }

  if (values.file === null) {
    errors.file = "Image is required";
  }

  return errors;
};

export default validate;
