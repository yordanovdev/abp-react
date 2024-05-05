import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { abp } from '../../lib/abp';
import { UserContext } from '../../context/userContext';
import { fetchConfiguration, fetchUser } from '../../helpers/wrapper';

interface IWrapperProps {
  baseUrl: string;
  tenantId?: number;
  fallback: NonNullable<ReactNode> | null;
}

export const AbpWrapper: React.FC<IWrapperProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const { children, baseUrl, tenantId, fallback } = props;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!baseUrl) throw Error('Base url is not specified');

    const token = abp.auth.getToken();

    const headers = {
      Authorization: token ? 'Bearer ' + token : null,
      'Abp.TenantId': tenantId,
    };

    Promise.all([
      fetchConfiguration(baseUrl, headers),
      fetchUser(baseUrl, setUser, headers),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  const userContextValue = useMemo(() => {
    return { user: user };
  }, [user]);

  return (
    <UserContext.Provider value={userContextValue}>
      {loading ? fallback : children}
    </UserContext.Provider>
  );
};

AbpWrapper.defaultProps = {
  tenantId: 1,
};
