import {
    ACTION_START,
    ACTION_ERROR,
    GET_USERS,
    GET_USER_BY_ID,
    ADD_USER,
    EDIT_USER,
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
        // case GET_ARTICLE:
        //     return {
        //         ...state,
        //         article: action.payload,
        //         isLoading: false,
        //         isLoaded: true,
        //     };
        case GET_USERS:
            //case GET_ARTICLES_BY_ID:
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        // case POST_ARTICLE:
        case DELETE_USER:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
            };
        // case EDIT_ARTICLE:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         article: action.payload.article,
        //         message: action.payload.message,
        //     };
        // case GET_CATEGORIES:
        //     return {
        //         ...state,
        //         categories: action.payload,
        //     };
        default:
            return state;
    }
}
