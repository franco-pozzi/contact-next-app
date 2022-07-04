import { Group } from "./group";

export interface Contact {
    _id: string;
    name: string;
    address: string;
    phone: string;
    belongTo: Group[];
}
