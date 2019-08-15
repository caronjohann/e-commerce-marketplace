import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "search") {
    return { ...state, searchQuery: action.typedSearch };
  }
  if (action.type === "all-items") {
    return { ...state, allItems: action.allItems };
  }
  if (action.type === "username") {
    return { ...state, username: action.username };
  }
  if (action.type === "cart") {
    return { ...state, cartList: action.cartList };
  }
  if (action.type === "logout") {
    return { ...state, username: "" };
  }
  return state;
};

const store = createStore(
  reducer,
  { searchQuery: "", allItems: [], username: "", cartList: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
