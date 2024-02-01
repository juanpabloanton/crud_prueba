import { combineReducers } from "redux";

import crud from "./crud/crudDuck";

const reducer = combineReducers({
    crud,
});

export default reducer;
