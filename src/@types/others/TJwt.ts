export interface TJwtPayload {
  _id: string;
  email: string;
  username: string;
  fullName: string;
}

export interface JWT {
  accessToken: string;
  refreshToken: string;
}
