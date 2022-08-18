import axios from 'axios';
import { ApicalypseConfig } from 'apicalypse';

type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export async function getIGDBToken(): Promise<string> {
  if (
    !process.env._IGDB_ACCESS_TOKEN_EXPIRES_AT ||
    Date.now() >= parseInt(process.env._IGDB_ACCESS_TOKEN_EXPIRES_AT)
  ) {
    await axios({
      method: 'POST',
      url: 'https://id.twitch.tv/oauth2/token',
      params: {
        client_id: process.env.IGDB_CLIENT_ID as string,
        client_secret: process.env.IGDB_CLIENT_SECRET as string,
        grant_type: 'client_credentials',
      },
    })
      .then((response) => {
        const responseData = response.data as TokenResponse;
        process.env._IGDB_ACCESS_TOKEN = responseData.access_token;
        process.env._IGDB_ACCESS_TOKEN_EXPIRES_AT = (
          Date.now() +
          responseData.expires_in * 1000
        ).toString();
      })
      .catch((error) => {
        console.log(error);
        throw Error('Something went wrong retrieving an IGDB access token.');
      });
  }
  return process.env._IGDB_ACCESS_TOKEN as string;
}

export async function getIGDBRequestOptions(): Promise<ApicalypseConfig> {
  return {
    method: 'post',
    baseURL: 'https://api.igdb.com/v4',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID as string,
      Authorization: 'Bearer ' + (await getIGDBToken()),
    },
  };
}
