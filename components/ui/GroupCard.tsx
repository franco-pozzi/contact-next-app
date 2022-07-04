import { DragEvent, FC, useContext } from "react";

import { UIContext, ContactBookContext } from "../../context";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Card, CardActionArea, CardActions, CardContent, Tooltip, Typography } from "@mui/material";
import styles from './GroupCard.module.css';

import { Group } from "../../interfaces";
interface Props {
  group: Group;
}

export const GroupCard: FC<Props> = ({ group }) => {
  const { endDragging, isDragging, setFilterByGroup } = useContext(UIContext);
  const { deleteGroup, updateContact, contacts } = useContext(ContactBookContext);

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const contact = contacts.find(contact => contact._id === id)!;

    if (!contact.belongTo.find((item) => item.name === group.name)) {
      contact.belongTo = [...contact.belongTo, group];
      updateContact(contact);
    };

    endDragging();
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={`${styles.dropBox} ${isDragging ? styles.dragging : ''}`}>
      <Card onClick={() => setFilterByGroup(group)}>
        <CardActionArea>
          <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 1 }}>
            <Tooltip title='Eliminar' arrow>
              <CloseOutlinedIcon onClick={() => deleteGroup(group)} />
            </Tooltip>
          </CardActions>

          <CardContent sx={{ paddingTop: 1, paddingBottom: 3 }}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{group.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
