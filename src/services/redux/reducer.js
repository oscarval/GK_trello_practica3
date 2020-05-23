const initialState = {
  visibility: "ALL",
  lists: [],
  idItemDrag: null,
  idListDrag: null,
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

    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload.idList),
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
              if (task && task.id === action.payload.idTask) {
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
        lists: updateList ? updateList : [],
      };

    case "DELETE_TASK":
      const newListTasks = state.lists.map((list) => {
        if (list.id === action.payload.idList) {
          return {
            ...list,
            tasks: list.tasks.filter(
              (task) => task.id !== action.payload.idTask
            ),
          };
        }
        return list;
      });

      return {
        ...state,
        lists: newListTasks ? newListTasks : [],
      };
    case "MOVE_TASK_LIST":
      let taskToMove = null;
      const removeTaskList = state.lists.map((list) => {
        if (list.id === state.idListDrag) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => {
              if (task) {
                if (task.id !== state.idItemDrag) {
                  return task;
                } else {
                  taskToMove = task;
                  return null;
                }
              }
              return null;
            }),
          };
        }
        return list;
      });

      const updateTaskList = removeTaskList.map((list) => {
        if (list.id === action.payload.newIdList) {
          return {
            ...list,
            tasks: list.tasks && taskToMove ? [...list.tasks, taskToMove] : [],
          };
        } else {
          return list;
        }
      });

      // console.log({
      //   ...state,
      //   lists: updateTaskList ? updateTaskList : [],
      //   idItemDrag: null,
      //   idListDrag: null,
      // });

      return {
        ...state,
        lists: updateTaskList ? updateTaskList : [],
        idItemDrag: null,
        idListDrag: null,
      };

    // return {
    //   ...state,
    // };

    case "UPDATE_ITEM_DRAG":
      return {
        ...state,
        idItemDrag: action.payload.idTask,
        idListDrag: action.payload.idList,
      };
    case "REFRESH_ITEM_DRAG":
      return state;

    default:
      return state;
  }
}

export default reducer;
