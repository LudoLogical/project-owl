import type { NextApiRequest, NextApiResponse } from 'next';
import apicalypse from 'apicalypse';
import { getIGDBRequestOptions } from '../../utils/igdb/igdb-backend-utils';
import axios from 'axios';
import { BGA_BASE_URL, BGA_CLIENT_ID } from '../../utils/bga/bga-backend-utils';

export const PAGE_SIZE = 10;

export type DigitalProductsSearchResult = {
  id: number;
  name: string;
  first_release_date?: number;
  cover?: {
    id: number;
    image_id: string;
  };
  platforms?: [
    {
      id: string;
      name: string;
    }
  ];
};

export type PhysicalProductsSearchResult = {
  id: string;
  name: string;
  year_published?: number;
  image_url?: string;
  primary_publisher?: {
    id?: string;
    name?: string;
    url?: string;
  };
};

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    DigitalProductsSearchResult[] | PhysicalProductsSearchResult[] | string
  >
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
    await axios({
      method: 'GET',
      url: BGA_BASE_URL + '/search',
      params: {
        client_id: BGA_CLIENT_ID,
        fields: 'id,name,year_published,image_url,primary_publisher',
        limit: PAGE_SIZE,
        skip: PAGE_SIZE * (page - 1),
        name: query,
      },
    }).then((response) => {
      if (response.data.count <= PAGE_SIZE * (page - 1)) {
        // Prevents "send last results" behavior
        res.status(200).json([]);
      } else {
        res.status(200).json(response.data.games);
      }
    });
  } else {
    res.status(400).send('isDigital must be either true or false.');
  }
}
