import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer.js";
import { save, load } from "redux-localstorage-simple";
const createStoreWithMiddleware = applyMiddleware(save())(createStore);

const store = createStoreWithMiddleware(
  reducer,
  load({
    preloadedState: {
      visibility: "ALL",
      lists: [],
      isMove: false,
    },
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
