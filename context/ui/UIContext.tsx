import { createContext } from "react";

import { Group } from '../../interfaces/group';

export interface ContextProps {
  isAddingEntry: boolean;
  isDragging: boolean;
  filterByGroup: Group;

  setIsAddingEntry: (isAdding: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
  setFilterByGroup: (group: Group) => void;
};

export const UIContext = createContext({} as ContextProps);
