import { useState, useContext } from 'react';

import { ContactBookContext } from '../../context';

import { v4 as uuidv4 } from 'uuid';

import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { RenderIf } from './';

export const NewGroup = () => {
  const { createGroup } = useContext(ContactBookContext);

  const [group, setGroup] = useState('');
  const [touched, setTouched] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [isAddingGroup, setIsAddingGroup] = useState(false);

  const resetInputs = () => {
    setTouched(false);
    setGroup('');
    setInputError(false);
    setIsAddingGroup(false);
  };

  const onSave = () => {
    if (!group) { return setInputError(true) };

    const newGroup = {
      _id: uuidv4(),
      name: group,
    };

    createGroup(newGroup);
    resetInputs();
  };

  return (
    <Box sx={{ marginBottom: 2 }}>

      <RenderIf isTrue={isAddingGroup}>
        <>
          <TextField
            variant='outlined'
            size='small'
            fullWidth
            sx={{ marginTop: 2, marginBottom: 2 }}
            autoFocus
            placeholder='Grupo'
            label='Grupo'
            helperText={inputError && touched && '* Obligatorio'}
            error={inputError && touched}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <Box display='flex' justifyContent='space-between'>
            <Button variant='outlined' color='error' onClick={resetInputs}>
              Cancelar
            </Button>
            <Button variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      </RenderIf>

      <RenderIf isTrue={!isAddingGroup}>
        <Button
          startIcon={<AddOutlinedIcon />}
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingGroup(true)}
        >
          Agregar Grupo
        </Button>
      </RenderIf>
    </Box >
  )
}
