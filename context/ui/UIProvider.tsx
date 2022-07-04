import { FC, useReducer } from "react";

import { UIContext, uiReducer } from "./";

import { Group } from "../../interfaces";
export interface UIState {
  isAddingEntry: boolean;
  isDragging: boolean;
  filterByGroup: Group;
};

type UIProviderProps = {
  children: React.ReactNode;
};

export const UI_INITIAL_STATE: UIState = {
  isAddingEntry: false,
  isDragging: false,
  filterByGroup: { _id: '', name: '' },
};


export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  const setFilterByGroup = (group: Group) => {
    dispatch({ type: "UI - Set filter by group", payload: group });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        setIsAddingEntry,
        startDragging,
        endDragging,
        setFilterByGroup
      }}
    >
      {children}
    </UIContext.Provider>
  );
};