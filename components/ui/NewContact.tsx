import { useState, useContext } from 'react';

import { UIContext, ContactBookContext } from '../../context';

import { RenderIf } from './RenderIf';

import { v4 as uuidv4 } from 'uuid';

import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useContactinfo } from '../../hooks/useContactinfo';

export const NewContact = () => {
  const { createContact } = useContext(ContactBookContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const { models, operators } = useContactinfo();
  const [touched, setTouched] = useState(false);

  const resetInputs = () => {
    setTouched(false);
    operators.setName('');
    operators.setAddress('');
    operators.setPhone('');
    operators.handleError('');
    setIsAddingEntry(false);
  };

  const onSave = () => {
    if (!models.name) { return operators.handleError('name') };
    if (!models.address) { return operators.handleError('address') };
    if (!models.phone) { return operators.handleError('phone') };

    const newContact = {
      _id: uuidv4(),
      name: models.name,
      address: models.address,
      phone: models.phone,
      belongTo: [],
    };

    createContact(newContact);
    resetInputs();
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <RenderIf isTrue={isAddingEntry}>
        <>
          <TextField
            variant='outlined'
            size='small'
            fullWidth
            sx={{ marginTop: 2, marginBottom: 2 }}
            autoFocus
            placeholder='Nombre'
            label='Nombre'
            helperText={models.inputsError === 'name' && touched && '* Obligatorio'}
            error={models.inputsError === 'name' && touched}
            value={models.name}
            onChange={(e) => operators.setName(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <TextField
            variant='outlined'
            size='small'
            fullWidth
            sx={{ marginBottom: 2 }}
            label='Dirección'
            helperText={models.inputsError === 'address' && touched && '* Obligatorio'}
            error={models.inputsError === 'address' && touched}
            value={models.address}
            onChange={(e) => operators.setAddress(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <TextField
            variant='outlined'
            size='small'
            fullWidth
            sx={{ marginBottom: 2 }}
            label='Teléfono'
            helperText={models.inputsError === 'phone' && touched && '* Obligatorio'}
            error={models.inputsError === 'phone' && touched}
            value={models.phone}
            onChange={(e) => operators.setPhone(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <Box display='flex' justifyContent='space-between'>
            <Button variant='outlined' color='error' onClick={resetInputs}>
              Cancelar
            </Button>

            <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />} onClick={onSave}>
              Guardar
            </Button>
          </Box>
        </>
      </RenderIf>

      <RenderIf isTrue={!isAddingEntry}>
        <Button
          startIcon={<AddOutlinedIcon />}
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Contacto
        </Button>
      </RenderIf>
    </Box>
  );
};
