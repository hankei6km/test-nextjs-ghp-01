import { NextApiRequest, NextApiResponse } from 'next';
import { ApiNameArticleValues } from '../../../lib/client';

// apiName によって、どの API のプレビューか決定する..
// apiName で動的に扱うにはリダイレクト先をどこかで決める必要がある。
// と、思ったのだが、やはり分ける?
const preCheck = (
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
      return res.status(401).json({ message: 'Invalid slug' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.name });
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  let location = '';
  switch (req.query.apiName) {
    case 'pages':
      // pages では slug は実質的には使わない(問題出るか?)
      // slug が指す id が含まれる location へリダイレクトさせる
      switch (id) {
        case '_global':
          location = `/`;
          break;
        case 'home':
          location = `/`;
          break;
        case 'blog':
        case 'blog-outer':
        case 'blog-category':
          location = `/posts/`;
          break;
      }
      break;
    case 'posts':
      location = `/${req.query.apiName}/${id}`;
      break;
  }
  if (location) {
    res.writeHead(307, { Location: location });
    return res.end('Preview mode enabled');
  }

  return res.status(404).end();
};

export default preCheck(handler);
