// Constants
const LOADING_CRUD_INITIAL_STATE = {
    setloading: false,
    data: [],
};

// Types
const LOADING_CRUD = "LOADING_CRUD";
const DATA_CRUD = "DATA_CRUD";

// Reducer
export default function crud(state = LOADING_CRUD_INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_CRUD:
            return { ...state, setloading: action.payload };
        case DATA_CRUD:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

// Action Creator
export const setLoadingCrud = (obj) => (dispatch) => {
    try {
        dispatch({ type: LOADING_CRUD, payload: obj });
    } catch (err) {
        console.error(err);
    }
};
export const setdataCrud = (obj) => (dispatch) => {
    try {
        dispatch({ type: DATA_CRUD, payload: obj });
    } catch (err) {
        console.error(err);
    }
};
