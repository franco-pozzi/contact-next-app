import { Contact, Group } from "../../interfaces";
import { ContactBookState } from "./";

type ContactBookActionType =
    | { type: "[ContactBook] Populate localStorage copy", payload: ContactBookState }
    | { type: "[Contact] Create-Contact", payload: Contact }
    | { type: "[Contact] Delete-Contact", payload: Contact }
    | { type: "[Contact] Update-Contact", payload: Contact }
    | { type: "[Group] Create-Group", payload: Group }
    | { type: "[Group] Delete-Group", payload: Group }

export const contactBookReducer = (state: ContactBookState, action: ContactBookActionType): ContactBookState => {
    switch (action.type) {
        case "[ContactBook] Populate localStorage copy":
            return {
                ...state,
                ...action.payload
            };
        case "[Contact] Create-Contact":
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };
        case "[Contact] Delete-Contact":
            return {
                ...state,
                contacts: state.contacts.filter(contact => {
                    if (contact._id !== action.payload._id) {
                        return contact
                    };
                }),
            };
        case "[Contact] Update-Contact":
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact._id === action.payload._id) {
                        contact = action.payload
                    }
                    return contact
                }),
            };
        case "[Group] Create-Group":
            return {
                ...state,
                groups: [...state.groups, action.payload],
            };
        case "[Group] Delete-Group":
            return {
                ...state,
                groups: state.groups.filter(group => {
                    if (group._id !== action.payload._id) {
                        return group
                    };
                }),
            };
        default:
            return state;
    };
};
