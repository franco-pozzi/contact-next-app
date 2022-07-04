import type { NextPage } from "next";
import { useContext } from "react";

import { ContactBookContext, UIContext } from "../context";

import { Layout } from "../components/layouts";
import { NewGroup, GroupList, FilterContactList, ContactList, NewContact, RenderIf } from '../components/ui';

import { Card, CardActions, CardContent, CardHeader, Grid } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Home: NextPage = () => {
  const { filterByGroup, setFilterByGroup } = useContext(UIContext)
  const { groups } = useContext(ContactBookContext)

  return (
    <Layout>
      <Grid container spacing={2} maxWidth={1400} justifyContent='center' sx={{ margin: '0 auto' }}>
        <RenderIf isTrue={!!(groups.length && filterByGroup.name)}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 1, paddingBottom: 0 }}>
                <CloseOutlinedIcon onClick={() => setFilterByGroup({ _id: '', name: '' })} />
              </CardActions>
              <CardHeader sx={{ textAlign: 'center' }} title={`Contactos en ${filterByGroup.name}`} />
              <CardContent>
                <FilterContactList />
              </CardContent>
            </Card>
          </Grid>
        </RenderIf>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Grupos' />
            <CardContent>
              <NewGroup />
              <GroupList />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Contactos' />
            <CardContent>
              <NewContact />
              <ContactList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
