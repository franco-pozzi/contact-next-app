import { FC, useEffect, useReducer } from 'react';

import { ContactBookContext, contactBookReducer } from './';

import { Contact, Group } from '../../interfaces';

type ContactBookProviderProps = {
  children: React.ReactNode;
};

export interface ContactBookState {
  contacts: Contact[];
  groups: Group[];
};

const initialContactBook: ContactBookState = {
  contacts: [],
  groups: []
};


export const ContactBookProvider: FC<ContactBookProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(contactBookReducer, initialContactBook);

  const populateLocalCopy = (contactBook: ContactBookState) => {
    dispatch({ type: '[ContactBook] Populate localStorage copy', payload: contactBook });
  };

  const createContact = (user: Contact) => {
    dispatch({ type: '[Contact] Create-Contact', payload: user });
  };

  const deleteContact = (user: Contact) => {
    dispatch({ type: '[Contact] Delete-Contact', payload: user });
  };

  const updateContact = (user: Contact) => {
    dispatch({ type: '[Contact] Update-Contact', payload: user });
  };

  const createGroup = (group: Group) => {
    console.log('create action')
    dispatch({ type: '[Group] Create-Group', payload: group });
  };

  const deleteGroup = (group: Group) => {
    dispatch({ type: '[Group] Delete-Group', payload: group });
  };

  useEffect(() => {
    if (!state.contacts.length && !state.groups.length) {
      const localCopy = localStorage.getItem('contactBook')
      if (localCopy) {
        const localFormatCopy = JSON.parse(localCopy)
        populateLocalCopy(localFormatCopy);
      }
    }
  }, [])

  useEffect(() => {
    if (state.contacts.length || state.groups.length) {
      localStorage.setItem('contactBook', JSON.stringify(state));
    };
    if (!state.contacts.length && !state.groups.length) {
      localStorage.clear()
    }
  }, [state]);

  return (
    <ContactBookContext.Provider
      value={{
        ...state,
        createContact,
        deleteContact,
        updateContact,
        createGroup,
        deleteGroup,
      }}
    >
      {children}
    </ContactBookContext.Provider >
  );
};