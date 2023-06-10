import React, { useEffect, useState } from "react";
import {
  FaEllipsisV,
  FaTimes,
  FaEye,
  FaTrash,
  FaEdit,
  FaAngleDown,
} from "react-icons/fa";
import { deleteUserAPI, getUsersAPI, statusChangeAPI } from "../Services/Services";
import { useNavigate } from "react-router-dom";

function ListUsers() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowStatus, setSelectedRowStatus] = useState(null);
  const [users, setUsers] = useState([]);
  let count=1;
  useEffect(() => {
    getUsersAPI()
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.users);
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);
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

  const handleDelete = (id)=>{
    const data = {id:id}
    deleteUserAPI(data).then((res)=>{
        if(res.data.status){
            const updated = users.filter((value) =>{
                if(value._id !==id) return value
            });
            console.log(updated);
              setUsers(updated);
        }
    })
  }

  const handleEdit = (id)=>{
    const userData = users.filter((value)=>value._id === id)
    navigate('/edit-user',{state:userData[0]})
  }

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div>
            
        </div>
        <div>
        <p className="text-black text-[40px]">USERS</p>
        </div>
        <div>
        <p>hfj</p>
        </div>
        
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <td className="px-6 py-4">{count++}</td>
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
                        <div className="flex justify-start gap-5 mt-2 cursor-pointer">
                          <FaEye className="text-green-500"  />
                          <div className="mt-[-3px] hover:text-green-500">View</div>
                        </div>
                        <div onClick={()=>handleEdit(user._id)} className="flex justify-start gap-5 mt-2 cursor-pointer">
                          <FaEdit className="text-blue-500"  />
                          <div className="mt-[-3px] hover:text-blue-500">Edit</div>
                        </div>
                        <div onClick={()=>handleDelete(user._id)} className="flex justify-start gap-5 mt-2 cursor-pointer">
                          <FaTrash className="text-red-500"  />
                          <div className="mt-[-3px] hover:text-red-500">Delete</div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUsers;
