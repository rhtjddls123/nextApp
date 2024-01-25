import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const offset = new Date().getTimezoneOffset() * 60000;
  if (req.method === 'GET') {
    return res.status(200).json(new Date(Date.now() - offset));
  }
}
