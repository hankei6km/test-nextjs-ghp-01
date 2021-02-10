import { NextApiRequest, NextApiResponse } from 'next';
import { ApiNameArticleValues } from './client';

export const previewSetupHandler = (
  fn: (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    id: string
  ) => Promise<void>
) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !process.env.PREVIEW_SECRET ||
    process.env.PREVIEW_SECRET !== req.query.previewSecret ||
    !req.query.slug
  ) {
    return res.status(404).end();
  }
  if (!ApiNameArticleValues.some((v) => v === req.query.apiName)) {
    // 有効な API 名ではなかった
    return res.status(404).end();
  }
  try {
    const q = new URLSearchParams('');
    q.append('fields', 'id');
    q.append('draftKey', req.query.draftKey as string);
    const fres = await fetch(
      `${process.env.API_BASE_URL}api/v1/${req.query.apiName}/${
        req.query.slug
      }?${q.toString()}`,
      {
        method: 'GET',
        headers: { 'X-API-KEY': process.env.GET_API_KEY || '' }
      }
    );
    if (fres.ok) {
      const content = await fres.json();
      res.setPreviewData({
        slug: content.id,
        draftKey: req.query.draftKey
      });
      return await fn(req, res, content.id);
    } else {
      return res.status(401).json({ message: 'Invalid slug / draftKey' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.name });
  }
};
