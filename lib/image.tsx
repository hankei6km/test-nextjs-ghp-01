import ReactDomServer from 'react-dom/server';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import merge from 'deepmerge';
import gh from 'hast-util-sanitize/lib/github.json';
import { Schema } from 'hast-util-sanitize';
import cheerio from 'cheerio';
import siteServerSideConfig from '../src/site.server-side-config';

export type ImageInfo = {
  // カラーパレット、顔認識情報等も含める予定
  url: string;
  width: number;
  height: number;
};
export type ContentImage = {
  image: ImageInfo;
  alt: string;
  link?: string;
  newTab?: boolean;
  asThumb?: boolean;
};

export type ImageTemplate = {
  matcher: (content: ContentImage) => boolean;
  template: string;
  asThumb: boolean;
  overrideParams?: string[];
  templateSrc?: string;
};

export const imageMatcherLandscape = (
  min: number,
  max: number = -1
): ImageTemplate['matcher'] => {
  return (content: ContentImage): boolean => {
    if (content.image.width >= content.image.height) {
      return (
        min <= content.image.width && (max < 0 || content.image.width <= max)
      );
    }
    return false;
  };
};

export const imageMatcherPortrait = (
  min: number,
  max: number = -1
): ImageTemplate['matcher'] => {
  return (content: ContentImage): boolean => {
    if (content.image.height > content.image.width) {
      return (
        min <= content.image.height && (max < 0 || content.image.height <= max)
      );
    }
    return false;
  };
};

function toElm(
  contentImage: ContentImage,
  className: string,
  templateList: ImageTemplate[]
): string {
  const idx = templateList.findIndex((t) => t.matcher(contentImage));
  if (idx >= 0) {
    const template = templateList[idx].template;
    const $imageTempl = cheerio.load(template);
    $imageTempl('picture source').each((_idx, elm) => {
      const $elm = $imageTempl(elm);
      const srcSet = $elm.attr('srcset');
      if (srcSet) {
        const srcSetParams = srcSet.split(', ').map((v) => v.split('?', 2)[1]);
        $elm.attr(
          'srcset',
          srcSetParams.map((v) => `${contentImage.image.url}?${v}`).join(',')
        );
      }
      const $img = $imageTempl('picture img');
      const params = ($img.attr('src') || '').split('?', 2)[1];
      $img.attr('src', `${contentImage.image.url}?${params}`);
      $img.attr('alt', contentImage.alt);
      $img.attr('class', className);
    });
    if (contentImage.asThumb) {
      const $a = cheerio.load('<a></a>')('a');
      $a.attr('href', contentImage.image.url);
      $a.attr('target', '_blank');
      $a.attr('target', '_blank');
      $a.attr('rel', 'noopener noreferrer');
      $imageTempl('picture').wrap($a);
    }
    return $imageTempl('body').html() || '';
  }
  // とりあえず.
  const width =
    contentImage.image.width > contentImage.image.height
      ? 500
      : Math.round(
          (contentImage.image.width * 500) / contentImage.image.height
        );
  const height =
    contentImage.image.width > contentImage.image.height
      ? Math.round((contentImage.image.height * 500) / contentImage.image.width)
      : 500;
  const q = new URLSearchParams('');
  q.append('auto', 'compress');
  q.append('w', `${width}`);
  q.append('h', `${height}`);
  const imgTag = (
    <img
      src={`${contentImage.image.url}?${q.toString()}`}
      alt={contentImage.alt}
      // style={{ maxWidth: '100%' }}
      className={className}
      width={width}
      height={height}
    />
  );
  if (contentImage.asThumb) {
    return ReactDomServer.renderToStaticMarkup(
      <a
        href={contentImage.image.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {imgTag}
      </a>
    );
  }
  return ReactDomServer.renderToStaticMarkup(imgTag);
}

const schema = merge(gh, {
  tagNames: ['picture', 'source'],
  attributes: {
    source: ['srcSet', 'sizes'],
    img: ['srcSet', 'sizes', 'className']
  }
});
const processorHtml = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeMinifyWhitespace)
  .use(rehypeSanitize, (schema as unknown) as Schema)
  .use(rehypeStringify)
  .freeze();

export function imageToHtml(contentImage: ContentImage): string {
  const image = toElm(
    contentImage,
    siteServerSideConfig.imageConfig.contentImageClassName,
    siteServerSideConfig.imageConfig.template
  );
  // return image;
  let ret = '';
  processorHtml.process(image, (err, file) => {
    if (err) {
      console.error(err);
    }
    ret = String(file);
  });
  return ret;
}

const fmJsonQuery = (() => {
  const q = new URLSearchParams('');
  q.append('fm', 'json');
  return q.toString();
})();

export async function imageInfo(imageUrl: string): Promise<ImageInfo> {
  const res = await fetch(`${imageUrl}?${fmJsonQuery}`).catch((err) => {
    console.error(err);
    throw new Error(err);
  });
  const info = await res.json();
  const imageInfo: ImageInfo = {
    url: imageUrl,
    width: 0,
    height: 0
  };
  // この辺の詳細な仕様は不明なので様子見.
  // Orientationについて
  // イメージセンサーからのビットマップデータの保存方向(軸)とカメラの向きの関係性?
  // 背面カメラ
  // スマホを通常の持ち方にする(縦長) : 6
  // スマホを左に倒す(横長) : 1
  // スマホを右に倒す(横長) : 3
  // スマホをさかさまにする(縦長) : 8
  // 前面カメラ
  // スマホを通常の持ち方にする(縦長) : 8
  // スマホを左に倒す(背面カメラの向きに直すと右に倒す)(横長) : 3
  // あとの２方向は省略.
  // ここで必要なのは縦長か横長かの情報なので、
  // 以下のよれば 6 以上なら縦横を入れ替えた方がよさそう
  // https://github.com/blueimp/JavaScript-Load-Image/blob/master/js/load-image-orientation.js
  if (info.TIFF && info.Orientation && info.Orientation >= 6) {
    // アスペクト比的なものも保存しておく?
    imageInfo.width = info.PixelHeight;
    imageInfo.height = info.PixelWidth;
  } else {
    imageInfo.width = info.PixelWidth;
    imageInfo.height = info.PixelHeight;
  }

  return imageInfo;
}
