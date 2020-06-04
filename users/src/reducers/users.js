import {
    ACTION_START,
    ACTION_ERROR,
    GET_USERS,
    GET_USER_BY_ID,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../actions/users";

const initialState = {
    user: null,
    users: [],
    isLoading: false,
    isLoaded: false,
    message: null,
};

export function users(state = initialState, action) {
    switch (action.type) {
        case ACTION_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            };
        case ACTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                message: action.payload,
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        case ADD_USER:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                users: [...state.users, action.payload],
            };
        case UPDATE_USER:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                users: action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
            };
        default:
            return state;
    }
}
