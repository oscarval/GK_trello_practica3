import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer.js";
import { save, load, clear } from "redux-localstorage-simple";
const createStoreWithMiddleware = applyMiddleware(save())(createStore);

const store = createStoreWithMiddleware(
  reducer,
  load({
    preloadedState: {
      visibility: "ALL",
      lists: [],
      idItemDrag: null,
      idListDrag: null,
    },
  }),
  // clear(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
