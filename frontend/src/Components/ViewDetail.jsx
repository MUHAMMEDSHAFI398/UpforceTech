import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteUserAPI } from "../Services/Services";

function ViewDetail() {
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
  const [userData, setUserData] = useState(initialValues);

  useEffect(() => {
    const state = location.state;
    setUserData({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      mobile: state.mobile,
      status: state.status,
      location: state.location,
      gender: state.gender,
      profileImg: state.profileImg,
      _id: state._id,
    });
  }, []);
  const handleEdit = () => {
    navigate("/edit-user", { state: userData });
  };
  const handleDelete = () => {
    const data = { id: location.state._id };
    deleteUserAPI(data)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        navigate("/error");
      });
  };
  return (
    <>
      <div>
        <div className="flex justify-center mt-2 sm:mt-0">
          <div className="flex justify-start mt-5 gap-3">
            <button
              onClick={() => navigate("/add-user")}
              className="w-[140px] h-[37px] bg-red-800 rounded-lg text-white"
            >
              + Adduser
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-[140px] h-[37px] bg-red-800 rounded-lg text-white"
            >
              View users
            </button>
          </div>
        </div>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-8">
          <div className="flex flex-col items-center">
            <img
              src={userData.profileImg}
              alt="/Images/profileIcon.avif"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {userData.firstName + " " + userData.lastName}
            </h2>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Personal Information
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className=" mr-2">Mobile Number:</span>
                <span className="text-gray-800">{userData.mobile}</span>
              </div>
              <div className="flex items-center">
                <span className=" mr-2">Email:</span>
                <span className="text-gray-800">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <span className=" mr-2">Status:</span>
                <span className="text-green-500">{userData.status}</span>
              </div>
              <div className="flex items-center">
                <span className=" mr-2">Gender:</span>
                <span className="text-gray-800">{userData.gender}</span>
              </div>
              <div className="flex items-center">
                <span className=" mr-2">Location:</span>
                <span className="text-gray-800">{userData.location}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleEdit}
              className="w-[88px] h-[38px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-[88px] h-[38px] bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDetail;
