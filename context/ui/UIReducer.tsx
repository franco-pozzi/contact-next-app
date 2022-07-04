import { UIState } from "./";

import { Group } from "../../interfaces";

type UIActionType =
  | { type: "UI - Set isAddingEntry", payload: boolean }
  | { type: "UI - Start Dragging" }
  | { type: "UI - End Dragging" }
  | { type: "UI - Set filter by group", payload: Group };


export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Set isAddingEntry":
      return {
        ...state,
        isAddingEntry: action.payload
      };
    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };
    case "UI - Set filter by group":
      return {
        ...state,
        filterByGroup: action.payload,
      };
    default:
      return state;
  };
};
