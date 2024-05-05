import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useAbpUser = <T>() => {
  const { user } = useContext(UserContext);

  return user as T;
};
