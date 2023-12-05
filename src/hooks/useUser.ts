import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useUser = () => {
  const { user } = useContext(UserContext);

  return user;
};
