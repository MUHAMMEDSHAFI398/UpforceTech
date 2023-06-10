import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import "../Style.css";
import {
  FaEllipsisV,
  FaTimes,
  FaEye,
  FaTrash,
  FaEdit,
  FaAngleDown,
} from "react-icons/fa";
import {
  deleteUserAPI,
  exportToCsvAPI,
  getUsersAPI,
  searchUserAPI,
  statusChangeAPI,
} from "../Services/Services";
import { useNavigate } from "react-router-dom";

function ListUsers() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowStatus, setSelectedRowStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let [startingNo, setStartingNo] = useState(1);
  const [searchClear, setSearchClear] = useState(false);
  useEffect(() => {
    getUsersAPI(currentPage)
      .then((res) => {
        if (res.data.status) {
          setUsers(res.data.users);
          setStartingNo(res.data.startingNo);
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  }, [currentPage, searchClear]);
  const handleSelectedRowStatus = (index) => {
    setSelectedRowStatus(index);
    setSelectedRow(null);
  };
  const handleSelectedRow = (index) => {
    setSelectedRow(index);
    setSelectedRowStatus(null);
  };

  const handleStatusChange = (userId, status) => {
    const data = {
      userId: userId,
      status: status,
    };
    setSelectedRowStatus(null);
    statusChangeAPI(data)
      .then((res) => {
        if (res.data.status) {
          const updated = users.filter((value) => {
            if (value._id === userId) {
              value.status = status;
            }
            return value;
          });
          setUsers(updated);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    const data = { id: id };
    deleteUserAPI(data)
      .then((res) => {
        if (res.data.status) {
          const updated = users.filter((value) => {
            if (value._id !== id) return value;
          });
          setUsers(updated);
          setSelectedRow(null);
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  };

  const handleEdit = (id) => {
    const userData = users.filter((value) => value._id === id);
    navigate("/edit-user", { state: userData[0] });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (users.length === 5) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleView = (id) => {
    const userData = users.filter((value) => value._id === id);
    navigate("/view-details", { state: userData[0] });
  };

  const [search, setSearch] = useState({ search: "" });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    if (value === "") {
      setSearchClear(true);
    } else {
      setSearchClear(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = search.search;
    searchUserAPI(data)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        navigate("/error");
      });
  };
  const handleDownload = (e) => {
    e.preventDefault();
    exportToCsvAPI().then((response) => {
      const blob = new Blob([response.data], { type: "text/csv" });
      saveAs(blob, "data.csv");
    });
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap justify-between">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-start gap-2 ">
            <input
              onChange={handleSearch}
              className="search-input"
              type="text"
              name="search"
              placeholder="Search by name"
            />
            <button
              type="submit"
              className="w-[90px] h-[37px] bg-red-800 rounded-lg text-white"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex justify-start gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => navigate("/add-user")}
            className="w-[140px] h-[37px] bg-red-800 rounded-lg text-white"
          >
            + Adduser
          </button>
          <button
            onClick={handleDownload}
            className="w-[140px] h-[37px] bg-red-800 rounded-lg text-white"
          >
            Export to csv
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left  dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Full name
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Gender
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Profile
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="bg-white border-b relative" key={user._id}>
                <td className="px-6 py-4">{startingNo++}</td>
                <td className="px-6 py-4">
                  {user.firstName + " " + user.lastName}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="h-[30px] w-[80px] bg-red-800 rounded-lg text-white p-1">
                      <div
                        onClick={() => handleSelectedRowStatus(index)}
                        className="flex justify-between"
                      >
                        <p>{user.status}</p>
                        <FaAngleDown className="mt-1" />
                      </div>
                    </div>
                    <div className="">
                      {selectedRowStatus === index && (
                        <div className="absolute w-[90px] bg-white rounded-lg shadow-md z-10 px-3 py-3">
                          <div className="flex justify-end">
                            <div onClick={() => setSelectedRowStatus(null)}>
                              <FaTimes
                                className="close-icon cursor-pointer"
                                style={{ fontSize: "15px", color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="">
                            <div
                              onClick={() =>
                                handleStatusChange(user._id, "Active")
                              }
                              className="hover:bg-red-800 hover:text-white cursor-pointer"
                            >
                              Active
                            </div>
                            <div
                              onClick={() =>
                                handleStatusChange(user._id, "Inactive")
                              }
                              className="hover:bg-red-800 hover:text-white cursor-pointer"
                            >
                              Inactive
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <img
                    className="w-14 h-14 rounded-full bg-blue-500"
                    src={user.profileImg}
                    alt="/Images/profileIcon.avif"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <FaEllipsisV
                      onClick={() => handleSelectedRow(index)}
                      className="cursor-pointer"
                    />
                    {selectedRow === index && (
                      <div className="absolute  bg-white rounded-lg shadow-md z-10 px-3 py-3">
                        <div className="flex justify-end">
                          <div onClick={() => setSelectedRow(null)}>
                            <FaTimes
                              className="close-icon cursor-pointer"
                              style={{ fontSize: "15px", color: "red" }}
                            />
                          </div>
                        </div>
                        <div
                          onClick={() => handleView(user._id)}
                          className="flex justify-start gap-5 mt-2 cursor-pointer"
                        >
                          <FaEye className="text-green-500" />
                          <div className="mt-[-3px] hover:text-green-500">
                            View
                          </div>
                        </div>
                        <div
                          onClick={() => handleEdit(user._id)}
                          className="flex justify-start gap-5 mt-2 cursor-pointer"
                        >
                          <FaEdit className="text-blue-500" />
                          <div className="mt-[-3px] hover:text-blue-500">
                            Edit
                          </div>
                        </div>
                        <div
                          onClick={() => handleDelete(user._id)}
                          className="flex justify-start gap-5 mt-2 cursor-pointer"
                        >
                          <FaTrash className="text-red-500" />
                          <div className="mt-[-3px] hover:text-red-500">
                            Delete
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container flex justify-end mt-5 mb-5 ">
          <div className="flex items-center justify-center">
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 border border-black bg-white rounded"
            >
              {`<`}
            </button>
            <span className="px-4 py-2 border text-white  bg-red-800">
              {currentPage}
            </span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 border border-black bg-white rounded"
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
