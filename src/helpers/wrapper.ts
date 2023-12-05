import axios from 'axios';
import { IUser } from '../context/userContext';
import { initialiseApp } from '../utils/init';
import { abp } from '../lib/abp';
import utils from '../utils/utils';

export const fetchConfiguration = async (baseUrl: string, headers = {}) => {
  const url = new URL('/AbpUserConfiguration/GetAll', baseUrl);
  let response = await axios
    .get(url.toString(), { headers })
    .catch((e) => console.log(e));

  if (response) {
    let result = response.data.result;

    if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        'en-US',
        new Date(new Date().getTime() + 5 * 365 * 86400000),
        abp.appPath,
      );
    }

    abp.clock.provider = utils.getCurrentClockProvider(result.clock.provider);
    initialiseApp(result);
  }
};

export const fetchUser = async (
  baseUrl: string,
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  headers: {},
) => {
  const url = new URL(
    '/api/services/app/Session/GetCurrentLoginInformations',
    baseUrl,
  );
  let response = await axios
    .get(url.toString(), { headers })
    .catch((e) => console.log(e));

  if (response) {
    let result = response.data.result;

    if (result?.user) {
      setUser(result?.user);
      return result?.user;
    }
  }
  return null;
};
