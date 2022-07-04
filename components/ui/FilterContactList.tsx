import { FC, useContext, useMemo } from "react";

import { UIContext, ContactBookContext } from "../../context";

import { ContactCard } from './';

import { List, Paper, Typography } from "@mui/material";


export const FilterContactList: FC = () => {
  const { contacts } = useContext(ContactBookContext)
  const { filterByGroup } = useContext(UIContext)

  const contactsByGroup = useMemo(() => contacts.filter((contact) =>
    contact.belongTo.filter((group) =>
      group.name === filterByGroup.name).length),
    [filterByGroup, contacts]);

  return (
    <Paper
      sx={{
        height: "calc(100vh - 250px)",
        overflow: "auto",
        backgroundColor: "transparent",
        padding: "5px 10px",
        marginTop: '20px'
      }}
    >
      <List sx={{ transition: 'all .3s' }}>
        {
          contactsByGroup.length ?
            contactsByGroup.map((contact) => <ContactCard key={contact._id} contact={contact} />)
            :
            <Typography align="center">No hay contactos en este grupo</Typography>
        }
      </List>
    </Paper >
  );
};
