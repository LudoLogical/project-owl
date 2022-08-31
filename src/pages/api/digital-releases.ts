import type { NextApiRequest, NextApiResponse } from 'next';
import apicalypse from 'apicalypse';
import { getIGDBRequestOptions } from '../../utils/igdb/igdb-backend-utils';

export type DigitalReleasesSearchResult = {
  id: number;
  date: number;
  platform?: [
    {
      id: number;
      name: string;
    }
  ];
};

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DigitalReleasesSearchResult[]>
) {
  const ids = req.query.ids as string;
  const response = await apicalypse(await getIGDBRequestOptions())
    .fields(['date', 'platform.name'])
    .where(`id=(${ids})`)
    .request('/release_dates');
  res.status(200).json(response.data);
}
