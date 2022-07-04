import { DragEvent, FC, useContext, useState } from "react";

import { UIContext, ContactBookContext } from "../../context";
import { useContactinfo } from '../../hooks/useContactinfo';

import { RenderIf } from './RenderIf';

import { Card, CardActionArea, CardActions, CardContent, Chip, Grid, Input, Tooltip, Typography } from "@mui/material"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

import { Contact, Group } from "../../interfaces";
interface Props {
  contact: Contact;
};

export const ContactCard: FC<Props> = ({ contact }) => {
  const { endDragging, startDragging, setFilterByGroup } = useContext(UIContext);
  const { deleteContact, updateContact } = useContext(ContactBookContext);

  const [isEditting, setisEditting] = useState(false);
  const { models, operators } = useContactinfo(contact.name, contact.address, contact.phone);

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', contact._id);
    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const removeFromGroup = (group: Group) => {
    contact.belongTo = contact.belongTo.filter(itemGroup => itemGroup !== group);

    updateContact(contact);
  };

  const onSave = () => {
    if (!models.name) { return operators.handleError('name') };
    if (!models.address) { return operators.handleError('address') };
    if (!models.phone) { return operators.handleError('phone') };

    const modifiedContact = {
      ...contact,
      name: models.name,
      address: models.address,
      phone: models.phone,
    };

    operators.resetInputs();
    setisEditting(false);
    updateContact(modifiedContact);
  };

  const AllContactBelongTo = () => (
    <>
      {contact.belongTo.map(group =>
        <Grid item xs={12} sm={4} key={group._id}>
          <Tooltip title={group.name} arrow>
            <Chip
              label={group.name}
              onClick={() => setFilterByGroup(group)}
              onDelete={() => removeFromGroup(group)}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              size="small"
            />
          </Tooltip>
        </Grid>
      )}
    </>
  );

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 1, paddingBottom: 0, gap: 1 }}>
          <RenderIf isTrue={isEditting}>
            <>
              <Tooltip title="Guardar" arrow>
                <DoneOutlinedIcon onClick={onSave} />
              </Tooltip>
              <Tooltip title="Cancelar" arrow>
                <CloseOutlinedIcon onClick={() => setisEditting(false)} />
              </Tooltip>
            </>
          </RenderIf>

          <RenderIf isTrue={!isEditting}>
            <>
              <Tooltip title="Editar" arrow>
                <ModeEditOutlinedIcon onClick={() => setisEditting(true)} />
              </Tooltip>
              <Tooltip title="Eliminar" arrow>
                <CloseOutlinedIcon onClick={() => deleteContact(contact)} />
              </Tooltip>
            </>
          </RenderIf>
        </CardActions>

        <CardContent sx={{ paddingTop: 0 }}>
          <Typography sx={{ whiteSpace: 'pre-line' }} fontSize={12}>
            Nombre y Apellido
          </Typography>

          <RenderIf isTrue={isEditting} >
            <Input value={models.name}
              onChange={(e) => operators.setName(e.target.value)}
              error={models.inputsError === 'name'}
              fullWidth sx={{ marginBottom: '1rem' }} />
          </RenderIf>

          <RenderIf isTrue={!isEditting}>
            <Typography sx={{ whiteSpace: 'pre-line' }} mb={1}>{contact.name}</Typography>
          </RenderIf>

          <Typography sx={{ whiteSpace: 'pre-line' }} fontSize={12}>
            Direccion
          </Typography>

          <RenderIf isTrue={isEditting}>
            <Input value={models.address}
              onChange={(e) => operators.setAddress(e.target.value)}
              error={models.inputsError === 'address'}
              fullWidth sx={{ marginBottom: '1rem' }} />
          </RenderIf>

          <RenderIf isTrue={!isEditting}>
            <Typography sx={{ whiteSpace: 'pre-line' }} mb={1}>{contact.address}</Typography>
          </RenderIf>

          <Typography sx={{ whiteSpace: 'pre-line' }} fontSize={12}>
            Telefono
          </Typography>

          <RenderIf isTrue={isEditting}>
            <Input value={models.phone}
              onChange={(e) => operators.setPhone(e.target.value)}
              error={models.inputsError === 'phone'}
              fullWidth sx={{ marginBottom: '1rem' }} />
          </RenderIf>

          <RenderIf isTrue={!isEditting}>
            <Typography sx={{ whiteSpace: 'pre-line' }} mb={1}>{contact.phone}</Typography>
          </RenderIf>

          <Typography sx={{ whiteSpace: 'pre-line' }} fontSize={12} mb={1}>Pertenece a</Typography>
          <RenderIf isTrue={!!contact.belongTo.length}>
            <Grid container spacing={2}>
              <AllContactBelongTo />
            </Grid>
          </RenderIf>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
