import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initialiseApp } from '../../utils/init';
import { abp } from '../../lib/abp';
import utils from '../../utils/utils';
import { IUser, UserContext } from '../../context/userContext';
import { fetchConfiguration, fetchUser } from '../../helpers/wrapper';

interface IWrapperProps {
  baseUrl: string;
  tenantId?: number;
}

export const AbpWrapper: React.FC<IWrapperProps> = (props) => {
  const { children, baseUrl, tenantId } = props;

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!baseUrl) throw Error('Base url is not specified');

    const token = abp.auth.getToken();

    const headers = {
      Authorization: token ? 'Bearer ' + token : null,
      'Abp.TenantId': tenantId,
    };

    (async () => {
      await Promise.all([
        await fetchConfiguration(baseUrl, headers),
        await fetchUser(baseUrl, setUser, headers),
      ]);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

AbpWrapper.defaultProps = {
  tenantId: 1,
};
