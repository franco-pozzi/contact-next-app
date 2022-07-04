import { createContext } from 'react';
import { Contact, Group } from '../../interfaces';

export interface ContactBookContextProps {
  contacts: Contact[];
  groups: Group[];

  createContact: (user: Contact) => void;
  deleteContact: (user: Contact) => void;
  updateContact: (user: Contact) => void;
  createGroup: (group: Group) => void;
  deleteGroup: (group: Group) => void;
}

export const ContactBookContext = createContext({} as ContactBookContextProps);