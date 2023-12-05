import { abp } from '../lib/abp';
import configurationService from './utils';

export const initialiseApp = (configurationResponse: any): void => {
  configurationService.extend(true, abp, configurationResponse);
};
