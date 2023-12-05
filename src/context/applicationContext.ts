import { createContext } from 'react';
import { abp } from '../lib/abp';

type IUserContext = {
  abp: typeof abp | null;
  isLoading: boolean;
};

export const ApplicationContext = createContext<IUserContext>({
  abp: null,
  isLoading: true,
});
