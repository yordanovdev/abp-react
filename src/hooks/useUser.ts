import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useUser = <T>() => {
  const { user } = useContext(UserContext);

  return user as T;
};
