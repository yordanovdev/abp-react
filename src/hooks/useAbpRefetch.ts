import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useAbpRefetch = () => {
  const { refetchUser, refetchConfiguration } = useContext(UserContext);

  return { refetchUser, refetchConfiguration };
};
