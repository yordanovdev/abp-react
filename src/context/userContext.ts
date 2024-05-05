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
};

export const UserContext = createContext<IUserContext>({
  user: null,
});
