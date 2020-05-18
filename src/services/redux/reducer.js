const initialState = {
  visibility: "ALL",
  lists: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: action.payload.id,
            title: action.payload.title,
            tasks: action.payload.tasks,
          },
        ],
      };

    case "ADD_TASK":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.idList
            ? {
                ...list,
                tasks: [...list.tasks, { id: action.payload.idTask, text: "" }],
              }
            : list
        ),
      };

    case "UPDATE_TASK":
      const updateList = state.lists.map((list) => {
        if (list.id === action.payload.idList) {
          return {
            ...list,
            tasks: list.tasks.map((task) => {
              if (task.id === action.payload.idTask) {
                return { ...task, text: action.payload.text };
              }
              return task;
            }),
          };
        }
        return list;
      });

      return {
        ...state,
        lists: updateList,
      };
    default:
      return state;
  }
}

export default reducer;
