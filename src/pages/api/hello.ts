import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * This is a test of TypeDoc.
 */
export type Data = {
  name: string;
};

/**
 * A simple API endpoint.
 * @param req the request
 * @param res the response
 * @returns false;
 */
// noinspection JSUnusedGlobalSymbols
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}
