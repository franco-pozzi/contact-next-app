import { FC } from "react";

import Head from "next/head";

import { Navbar } from "../ui";

import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Agenda de contactos | Front.Id</title>
      </Head>      

      <Navbar />      
      
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
