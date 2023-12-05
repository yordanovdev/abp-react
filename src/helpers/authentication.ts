import { abp } from '../lib/abp';

interface ILogin {
  expireInSeconds: number;
  accessToken: string;
  encryptedAccessToken: string;
}

/**
 * The login function sets the access token and encrypted access token in the appropriate places and
 * returns the result.
 * @param {ILogin} result - The parameter `result` is of type `ILogin`.
 * @returns the `result` object.
 */
export const login = (result: ILogin) => {
  var tokenExpireDate = new Date(
    new Date().getTime() + 1000 * result.expireInSeconds,
  );

  if (result.accessToken) {
    abp.auth.setToken(result.accessToken, tokenExpireDate);
  }

  if (result.encryptedAccessToken) {
    abp.utils.setCookieValue(
      'enc_auth_token',
      result.encryptedAccessToken,
      tokenExpireDate,
      abp.appPath,
    );
  }
  return result;
};

/**
 * The function `clearAuthCookies` clears the authentication token and refresh token.
 */
export const clearAuthCookies = () => {
  abp.auth.clearToken();
  abp.auth.clearRefreshToken();
};
