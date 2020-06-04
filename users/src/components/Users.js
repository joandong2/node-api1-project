import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/users.js";

const Users = ({ getUsers, isLoaded, users, message }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="row">
            <div className="col-md-12">
                <h2>Users</h2>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoaded ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.bio}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                window.location.replace(
                                                    `/edit/${user.id}`
                                                );
                                            }}
                                            className="btn btn-info"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                window.location.replace(
                                                    `/delete/${user.id}`
                                                );
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Loading users..</p>
                        )}
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
        users: state.users.users,
        message: state.users.message,
    };
};

export default connect(mapStateToProps, { getUsers })(Users);
