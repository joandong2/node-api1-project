import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/users.js";
import { getUserById } from "../actions/users.js";
import { addUser } from "../actions/users.js";
import { updateUser } from "../actions/users.js";
import { deletetUser } from "../actions/users.js";

const Users = ({
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deletetUser,
    isLoaded,
    users,
    user,
    message,
}) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const [editState, setEditState] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        bio: "",
    });

    const inputChange = (e) => {
        e.persist();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (editState) {
            updateUser(user.id, formState);
        } else {
            addUser(formState);
        }

        setEditState(false);
        setFormState({
            name: "",
            bio: "",
        });
    };

    //console.log("form state", formState);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="new-user">
                    <form onSubmit={submitForm} className="form-inline">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name..."
                            onChange={inputChange}
                            value={formState.name}
                        />
                        <input
                            type="text"
                            name="bio"
                            className="form-control"
                            placeholder="Biography..."
                            onChange={inputChange}
                            value={formState.bio}
                        />
                        <button type="submit" className="btn btn-warning">
                            Submit
                        </button>
                    </form>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoaded
                            ? users.map((user) => (
                                  <tr key={user.id}>
                                      <td>{user.id}</td>
                                      <td>{user.name}</td>
                                      <td>{user.bio}</td>
                                      <td>
                                          <button
                                              onClick={() => {
                                                  setEditState(true);
                                                  getUserById(user.id);
                                                  setFormState({
                                                      name:
                                                          isLoaded &&
                                                          user != null
                                                              ? user.name
                                                              : "",
                                                      bio:
                                                          isLoaded &&
                                                          user != null
                                                              ? user.bio
                                                              : "",
                                                  });
                                              }}
                                              className="btn btn-info"
                                          >
                                              Edit
                                          </button>
                                          <button
                                              onClick={() => {
                                                  deletetUser(user.id);
                                                  window.location.replace("/");
                                              }}
                                              className="btn btn-danger"
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log("users component", state);
    return {
        isLoaded: state.users.isLoaded,
        user: state.users.user,
        users: state.users.users,
        message: state.users.message,
    };
};

export default connect(mapStateToProps, {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deletetUser,
})(Users);
