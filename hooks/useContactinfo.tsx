import { useState } from 'react'

export const useContactinfo = (userName: string = '', userAddress: string = '', userPhone: string = '') => {
  const [name, setName] = useState(userName);
  const [address, setAddress] = useState(userAddress);
  const [phone, setPhone] = useState(userPhone);
  const [inputsError, setInputsError] = useState('');

  const handleError = (forInput: string) => {
    setInputsError(forInput);
  };

  const resetInputs = () => {
    setName('');
    setAddress('');
    setPhone('');
    setInputsError('');
  };

  return {
    models: {
      name,
      address,
      phone,
      inputsError
    },
    operators: {
      setName,
      setAddress,
      setPhone,
      handleError,
      resetInputs,
    }
  };
};
