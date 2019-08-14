import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "search") {
    return { ...state, searchQuery: action.typedSearch };
  }
  if (action.type === "all-items") {
    return { ...state, allItems: action.allItems };
  }
  return state;
};

const store = createStore(
  reducer,
  { searchQuery: "", allItems: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
