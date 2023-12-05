import React, { useEffect, useMemo, useState } from 'react';
import { abp } from '../../lib/abp';
import { IUser, UserContext } from '../../context/userContext';
import { fetchConfiguration, fetchUser } from '../../helpers/wrapper';
import { ApplicationContext } from '../../context/applicationContext';

interface IWrapperProps {
  baseUrl: string;
  tenantId?: number;
}

export const AbpWrapper: React.FC<IWrapperProps> = (props) => {
  const [loading, setLoading] = useState(true);
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

      setLoading(false);
    })();
  }, []);

  const userContextValue = useMemo(() => {
    return { user: user };
  }, [user]);

  const applicationContextValue = useMemo(() => {
    return {
      abp: abp,
      isLoading: loading,
    };
  }, [loading, abp]);

  return (
    <UserContext.Provider value={userContextValue}>
      <ApplicationContext.Provider value={applicationContextValue}>
        {children}
      </ApplicationContext.Provider>
    </UserContext.Provider>
  );
};

AbpWrapper.defaultProps = {
  tenantId: 1,
};
