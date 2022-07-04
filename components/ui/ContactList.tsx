import { FC, useContext } from "react";

import { UIContext, ContactBookContext } from "../../context";

import { ContactCard } from "./";

import { List, Paper, Typography } from "@mui/material";

export const ContactList: FC = () => {
  const { contacts } = useContext(ContactBookContext)
  const { isDragging } = useContext(UIContext)

  return (
    <Paper
      sx={{
        height: "calc(100vh - 250px)",
        overflow: "auto",
        backgroundColor: "transparent",
        padding: "5px 10px",
      }}
    >
      <List sx={{ opacity: isDragging ? .2 : 1, transition: 'all .3s' }}>
        {
          contacts.length ?
            contacts.map((contact) => <ContactCard key={contact._id} contact={contact} />)
            :
            <Typography align="center">No tenes contactos agendados</Typography>
        }
      </List>
    </Paper>
  );
};
