

//constantes
const loadingCrud = {
    setloading: false
};
//types
const LOADING_CRUD = "LOADING_CRUD";


//reducer
export default function crud(state = loadingCrud, action) {
    switch (action.type) {
        case LOADING_CRUD:
            return { ...state, setloading: action.payload };
        default:
            return state;
    }
}

export const SetloadingCrud = (obj) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOADING_CRUD, payload: obj });
    } catch (err) {
        console.log(err);
    }
}

