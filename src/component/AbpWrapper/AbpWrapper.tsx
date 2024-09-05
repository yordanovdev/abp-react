import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { abp } from '../../lib/abp';
import { UserContext } from '../../context/userContext';
import { fetchConfiguration, fetchUser } from '../../helpers/wrapper';

interface IWrapperProps {
  baseUrl: string;
  tenantId?: number;
  fallback: NonNullable<ReactNode> | undefined;
}

export const AbpWrapper: React.FC<IWrapperProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const { children, baseUrl, tenantId, fallback } = props;

  const tenant = tenantId ?? 1;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!baseUrl) throw Error('Base url is not specified');

    const token = abp.auth.getToken();

    const headers = {
      Authorization: token ? 'Bearer ' + token : null,
      'Abp.TenantId': tenant,
      '.AspNetCore.Culture': abp.utils.getCookieValue(
        'Abp.Localization.CultureName',
      ),
    };

    Promise.all([
      fetchConfiguration(baseUrl, headers),
      fetchUser(baseUrl, setUser, headers),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  const refetchUser = async () => {
    const token = abp.auth.getToken();

    const headers = {
      Authorization: token ? 'Bearer ' + token : null,
      'Abp.TenantId': tenant,
    };

    await fetchUser(baseUrl, setUser, headers);
  };

  const refetchConfiguration = async () => {
    const token = abp.auth.getToken();

    const headers = {
      Authorization: token ? 'Bearer ' + token : null,
      'Abp.TenantId': tenant,
    };
    await fetchConfiguration(baseUrl, headers);
  };

  const userContextValue = useMemo(() => {
    return { user: user, refetchUser, refetchConfiguration };
  }, [user]);

  return (
    <UserContext.Provider value={userContextValue}>
      {loading ? fallback : children}
    </UserContext.Provider>
  );
};
