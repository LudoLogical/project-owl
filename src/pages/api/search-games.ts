import type { NextApiRequest, NextApiResponse } from 'next';
import apicalypse from 'apicalypse';
import { getIGDBRequestOptions } from '../../utils/igdb/igdb-backend-utils';

export const PAGE_SIZE = 10;

export type GamesSearchResult = {
  id: number;
  first_release_date?: number;
  name: string;
  cover: {
    id: number;
    image_id: string;
  };
  platforms: [
    {
      id: string;
      name: string;
    }
  ];
};

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GamesSearchResult[] | string>
) {
  const query = req.query.query as string;
  const page = parseInt(req.query.page as string);
  const isDigital = req.query.isDigital === 'true';
  const isNotDigital = req.query.isDigital === 'false';
  if (isDigital && !isNotDigital) {
    const response = await apicalypse(await getIGDBRequestOptions())
      .fields([
        'name',
        'cover.image_id',
        'first_release_date',
        'platforms.name',
      ])
      .limit(PAGE_SIZE)
      .offset(PAGE_SIZE * (page - 1))
      .search(query)
      .request('/games');
    res.status(200).json(response.data);
  } else if (isNotDigital && !isDigital) {
    res.status(400).send('Not yet supported.');
  } else {
    res.status(400).send('isDigital must be either true or false.');
  }
}
