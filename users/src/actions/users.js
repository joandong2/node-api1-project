import axios from "axios";

export const ACTION_START = "ACTION_START";
export const ACTION_ERROR = "ACTION_ERROR";
export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

const URL = "http://localhost:8080/api";

export const getUsers = () => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .get(`${URL}/users`)
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_USERS, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const getUserById = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .get(`${URL}/users/${id}`)
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_USER_BY_ID, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const addUser = (values) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .post(`${URL}/users`, values)
        .then((res) => {
            dispatch({ type: ADD_USER, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in adding new user.",
            });
        });
};

export const updateUser = (id, values) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .put(`${URL}/users/${id}`, values)
        .then((res) => {
            //console.log("update res", res);
            dispatch({ type: UPDATE_USER, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in adding new user.",
            });
        });
};

export const deletetUser = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .delete(`${URL}/users/${id}`)
        .then((res) => {
            //console.log("axios get by id result", res);
            dispatch({ type: DELETE_USER });
            window.location.replace("/");
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in deleting article by id.",
            });
        });
};

// export const getArticlesById = (id) => (dispatch) => {
//     dispatch({ type: ACTION_START });

//     axiosWithAuth()
//         .get(`/articles/categories/${id}`)
//         .then((res) => {
//             //console.log("axios result by id", res);
//             //console.log(res);
//             dispatch({ type: GET_ARTICLES_BY_ID, payload: res.data });
//         })
//         .catch((err) => {
//             //console.log("Err is: ", err);
//             dispatch({
//                 type: ACTION_ERROR,
//                 payload:
//                     err.response.status === 404
//                         ? "No articles related to this category..."
//                         : "Error in get request articles.",
//             });
//         });
// };
