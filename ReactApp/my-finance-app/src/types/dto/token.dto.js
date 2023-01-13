export default class TokenDto {
  accessToken = null;
  role = "";
  userId = "";
  tokenExpiration = null;
  refreshToken = "";

  constructor(accessToken, role, userId, tokenExpiration, refreshToken) {
    if (accessToken) this.accessToken = accessToken;
    if (role) this.role = role;
    if (userId) this.userId = userId;
    if (tokenExpiration) this.tokenExpiration = tokenExpiration;
    if (refreshToken) this.refreshToken = refreshToken;
  }

  static fromResponse(response) {
    return new TokenDto(
      response?.accessToken,
      response?.role,
      response?.userId,
      response?.tokenExpiration,
      response?.refreshToken
    );
  }
}
