import { FC, useContext } from "react";

import { UIContext, ContactBookContext } from "../../context";

import { GroupCard, RenderIf } from "./";

import { List, Paper, Typography } from "@mui/material";

export const GroupList: FC = () => {
  const { groups } = useContext(ContactBookContext)
  const { isDragging } = useContext(UIContext)

  const AllGroupCards = () => (
    <>
      {groups.map((group) => <GroupCard key={group._id} group={group} />)}
    </>
  );

  return (
    <Paper
      sx={{
        height: "calc(100vh - 250px)",
        overflow: "auto",
        backgroundColor: "transparent",
        padding: "5px 10px",
      }}
    >
      <List sx={{ opacity: isDragging ? .8 : 1, transition: 'all .3s' }}>
        <RenderIf isTrue={!!groups.length}>
          <AllGroupCards />
        </RenderIf>

        <RenderIf isTrue={!groups.length}>
          <Typography align="center">No tenes grupos agendados</Typography>
        </RenderIf>
      </List>
    </Paper >
  );
};
