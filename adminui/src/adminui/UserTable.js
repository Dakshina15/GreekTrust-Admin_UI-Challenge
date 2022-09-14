import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "./UserTable.css";
import Pagination from "./Pagination";
import UserRow from "./UserRow";
import EditableRow from "./EditableRow";
import error from "../assets/Error.png";

const UserTable = () => {
  const [adminData, setData] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // eslint-disable-next-line
  const [showPerPage, setShowPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [editUserId, setEditUserId] = useState(null);
  const [allSelected, setAllSelected] = useState(false);

  //FETCHING DATA FROM API
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      let data = response.data;
      //  console.log(data);
      // eslint-disable-next-line
      data = data.map((value) => {
        return { ...value, selected: false };
      });
      console.log(response);
      setData(response.data);
      setFilterData(response.data);
      setLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = adminData.filter((item) => {
      return (
        item.name.toLowerCase().match(search.toLowerCase()) ||
        item.email.toLowerCase().match(search.toLowerCase()) ||
        item.role.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
    // eslint-disable-next-line
  }, [search]);

   
  //   const result = adminData.filter((item) => {
  //     return (
  //       item.name.toLowerCase().match(search.toLowerCase()) ||
  //       item.email.toLowerCase().match(search.toLowerCase()) ||
  //       item.role.toLowerCase().match(search.toLowerCase())
  //     );
  //   setFilterData(result);
  //   // eslint-disable-next-line
  // };


  const onPaginationChange = (start, end) => {
    // console.log(start,end);
    setPagination({ start: start, end: end });
    setAllSelected(false);
    let data = filterData.map((val) => {
      return { ...val, selected: false };
    });
    setFilterData(data);
  };

  const handleEditClick = (event, value) => {
    event.preventDefault();
    setEditUserId(value.id);

    const userValues = {
      name: value.name,
      email: value.email,
      role: value.role,
    };
    setEditUserData(userValues);
  };

  const handleEditDataChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newUserData = { ...editUserData };
    newUserData[fieldName] = fieldValue;

    setEditUserData(newUserData);
  };

  const handleEditDataSubmit = (event) => {
    event.preventDefault();
    const editUser = {
      id: editUserId,
      name: editUserData.name,
      email: editUserData.email,
      role: editUserData.role,
    };

    const newUser = [...filterData];

    const index = filterData.findIndex((value) => value.id === editUserId);

    newUser[index] = editUser;

    setFilterData(newUser);
    setEditUserId(null);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDeleteClick = (editUserId) => {
    const newUser = [...filterData];

    const index = filterData.findIndex((value) => value.id === editUserId);

    newUser.splice(index, 1);

    setFilterData(newUser);
  };

  const allSelectHandler = (event) => {
    setAllSelected(!allSelected);
    let data;
    if (event.target.checked) {
      data = filterData.map((val) => {
        if (val.id > pagination.start && val.id <= pagination.end + 1)
          return { ...val, selected: true };
        return val;
      });
    } else {
      data = filterData.map((val) => {
        if (val.id > pagination.start && val.id <= pagination.end + 1)
          return { ...val, selected: false };
        return val;
      });
    }
    setFilterData(data);
  };

  const selectRowHandler = (id) => {
    let data = filterData.map((value) => {
      if (value.id === id) {
        return { ...value, selected: !value.selected };
      }
      return value;
    });
    setAllSelected(false);
    setFilterData(data);
  };

  const deleteSelectedHandler = () => {
    let data = filterData.filter((val) => !val.selected);
    setFilterData(data);
  };

  return (
    <>
      {/* SEARCH BAR  */}
      <div className="search-bar">
        <input
          className="search-container"
          placeholder="Search by name, email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ERROR HANDLING */}
      {isloading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : isError ? (
        <div className="noData-container">
          <h1>Oops failed to fetch data...!</h1>
          <div className="img-container">
            <img
              className="noData-img"
              src={error}
              alt="Sorry data not fetch at this moment"
            />
          </div>
        </div>
      ) : (
        <>
          {/* TABLE HEADER */}
          <div className="main-container">
            <form className="form-container" onSubmit={handleEditDataSubmit}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        checked={allSelected}
                        onChange={allSelectHandler}
                        type="checkbox"
                      />
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData
                    .slice(pagination.start, pagination.end)
                    .map((value, i) => (
                      <Fragment key={value.id}>
                        {editUserId === value.id ? (
                          <EditableRow
                            value={value}
                            editUserData={editUserData}
                            handleEditDataChange={handleEditDataChange}
                            handleCancelClick={handleCancelClick}
                            selectRowHandler={selectRowHandler}
                          />
                        ) : (
                          <UserRow
                            value={value}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                            selectRowHandler={selectRowHandler}
                          />
                        )}
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </form>
          </div>

            {/* PAGINATION AND DELETE BUTTON */}
          <div className="footer">
            <button
              className="delete-Btn"
              type="button"
              onClick={deleteSelectedHandler}
            >
              Delete Selected
            </button>
            <Pagination
              showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
              total={filterData.length}
            />
          </div>
        </>
      )}
    </>
  );
};
export default UserTable;

