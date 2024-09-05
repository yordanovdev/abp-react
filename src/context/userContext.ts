import { createContext } from 'react';

export interface IUser {
  id: number;
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
}

type IUserContext = {
  user: any;
  refetchConfiguration: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

export const UserContext = createContext<IUserContext>({
  user: null,
  refetchUser: () => Promise.resolve(),
  refetchConfiguration: () => Promise.resolve(),
});
