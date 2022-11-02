import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@middleware/db';

export default function r() {
  return nc<NextApiRequest, NextApiResponse>().use(db());
}
