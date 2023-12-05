import { useContext } from 'react';
import { abp } from '../lib/abp';
import { ApplicationContext } from '../context/applicationContext';

export const useAbp = () => {
  const { isLoading } = useContext(ApplicationContext);

  return { abp, isLoading };
};
