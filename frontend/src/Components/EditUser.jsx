import React, { useEffect, useState } from "react";
import "../Style.css";
import { editUserWithProfileAPI, edituserAPI } from "../Services/Services";
import { message, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import validate from "../Validation/EditUserValidation";

function EditUser() {
  const location = useLocation();

  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    status: "",
    location: "",
    file: null,
  };
  const [loading, setLoading] = useState(false);
  const [gender, setGeneder] = useState({ gender: "" });
  const [formValues, setformValues] = useState(initialValues);
  const [imageURL, setImageURL] = useState(null);
  const [imageError, setImageError] = useState("");
  const [error, setErrors] = useState({});
  const [altImg, setaltImg] = useState({});
  useEffect(() => {
    const state = location.state;
    setformValues({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      mobile: state.mobile,
      status: state.status,
      location: state.location,
      file: null,
    });
    setGeneder({ gender: state.gender });
    setaltImg({ file: state.profileImg });
  }, []);

  const handlegenderChange = (e) => {
    const { name, value } = e.target;
    setGeneder({ ...gender, [name]: value });
    setErrors({ ...error, [name]: "" });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "mobile") {
      setformValues({ ...formValues, [name]: parseInt(value) });
      setErrors({ ...error, [name]: "" });
    } else {
      setformValues({ ...formValues, [name]: value });
      setErrors({ ...error, [name]: "" });
    }
  };

  const handleFileChange = (event) => {
    setformValues({
      ...formValues,
      file: event.target.files[0],
    });
    const imageURL = URL.createObjectURL(event.target.files[0]);
    setImageURL(imageURL);
    setImageError("");
    setErrors({ ...error, file: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    formValues.gender = gender.gender;
    const errors = validate(formValues);

    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      setLoading(false);
    } else {
      if (formValues.file !== null) {
        for (const key in formValues) {
          data.append(key, formValues[key]);
        }
        const headers = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const id = location.state._id;
        editUserWithProfileAPI(id, data, headers)
          .then((res) => {
            if (res.data.imageError) {
              setImageError(res.data.imageError);
            } else {
              message.success("Successfully Edited the user");
              setLoading(false);
              navigate("/users");
            }
          })
          .catch((err) => {
            console.log(err);
            navigate("/error");
          });
      } else {
        const id = location.state._id;
        edituserAPI(id, formValues)
          .then((res) => {
            if (res.data.imageError) {
              setImageError(res.data.imageError);
            } else {
              message.success("Successfully Edited the user");
              setLoading(false);
              navigate("/users");
            }
          })
          .catch((err) => {
            console.log(err);
            navigate("/error");
          });
      }
    }
  };
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <p className="text-black text-[40px]">Edit user</p>
      </div>
      <div className="flex justify-center mt-3">
        <form onSubmit={handleSubmit}>
          <div className="parentBox p-4">
            {imageURL ? (
              <div className="flex justify-center">
                <img
                  className="profileImg"
                  src={imageURL}
                  alt="/Images/profileIcon.avif"
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <img
                  className="profileImg"
                  src={altImg.file}
                  alt="/Images/profileIcon.avif"
                />
              </div>
            )}
            <div className="grid grid-cols-1  md:grid-cols-2 ">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  value={formValues.firstName}
                  id="firstName"
                  placeholder="Enter first name"
                  className="register-input"
                  type="text"
                  name="firstName"
                />
                {error.firstName && (
                  <p className="text-red-500">{error.firstName}</p>
                )}
              </div>
              <div className="flex flex-col mt-2 md:mt-0">
                <label htmlFor="lastName" className="label md:ml-2">
                  Last Name
                </label>
                <input
                  value={formValues.lastName}
                  onChange={handleChange}
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  className="register-input md:ml-2"
                  type="text"
                />
                {error.lastName && (
                  <p className="ml-2 text-red-500">{error.lastName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-2 mt-3">
              <div className="flex flex-col">
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <input
                  value={formValues.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="register-input"
                  type="email"
                />
                {error.email && <p className="text-red-500">{error.email}</p>}
              </div>
              <div className="flex flex-col mt-2 md:mt-0">
                <label htmlFor="mobile" className="md:ml-2">
                  Mobile
                </label>
                <input
                  value={formValues.mobile}
                  onChange={handleChange}
                  id="mobele"
                  name="mobile"
                  placeholder="Enter mobile"
                  className="register-input md:ml-2"
                  type="number"
                />
                {error.mobile && (
                  <p className="ml-2 text-red-500">{error.mobile}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 mt-3">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="label">
                  Select your gender
                </label>
                <div className="flex">
                  <input
                    name="gender"
                    value="male"
                    onChange={handlegenderChange}
                    checked={gender.gender === "male"}
                    type="radio"
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex">
                  <input
                    name="gender"
                    value="female"
                    onChange={handlegenderChange}
                    checked={gender.gender === "female"}
                    type="radio"
                  />
                  <label htmlFor="female">Female</label>
                </div>
                {error.gender && <p className="text-red-500">{error.gender}</p>}
              </div>
              <div className="flex flex-col mt-2 md:mt-0">
                <label htmlFor="status" className="md:ml-2">
                  Select your status
                </label>
                <select
                  className="register-input md:ml-2"
                  placeholder="select"
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  id="status"
                >
                  <option value="" hidden>
                    Select
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {error.status && (
                  <p className="ml-2 text-red-500">{error.status}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 mt-3">
              <div className="flex flex-col">
                <label htmlFor="files" className="label">
                  Select your profile
                </label>
                <div className="profileInput">
                  <input
                    accept="image/*"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    placeholder="Select your profile"
                    type="file"
                    className="w-full h-full"
                    key={formValues.file}
                  />
                </div>
                {error.file && <p className="text-red-500">{error.file}</p>}
                {imageError && <p className="text-red-500">{imageError}</p>}
              </div>
              <div className="flex flex-col mt-2 md:mt-0">
                <label htmlFor="location" className="label md:ml-2">
                  Enter your location
                </label>
                <input
                  onChange={handleChange}
                  value={formValues.location}
                  id="location"
                  name="location"
                  placeholder="Enter your location"
                  className="register-input md:ml-2"
                  type="text"
                />
                {error.location && (
                  <p className="ml-2 text-red-500">{error.location}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-5">
              {loading ? (
                <Spin size="large" />
              ) : (
                <button type="submit" className="submitbtn">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
