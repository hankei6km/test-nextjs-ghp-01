import ReactDomServer from 'react-dom/server';
import { ImageTemplate, imageTransformedUrl } from './imageTemplate';
import { normalizedHtml, processorHtml } from './html';
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
function toElm(
  contentImage: ContentImage,
  className: string,
  templateList: ImageTemplate[]
): string {
  const idx = templateList.findIndex((t) => t.matcher(contentImage));
  if (idx >= 0) {
    const intermediate = templateList[idx].intermediate;
    if (intermediate.kind === 'picture') {
      // picture タグのみ.
      // descriptor 'x' で決め打ち('w' でも 'x' 扱い)
      const PictureTag = (
        <picture>
          {intermediate.sources.map((source, i) => {
            return (
              <source
                key={i}
                media={source.suggestMedia}
                srcSet={source.srcset.set
                  .map((set) => {
                    return `${contentImage.image.url}?${set.src.url.paramsStr} ${set.density}${source.srcset.descriptor}`;
                  })
                  .join(' ,')}
              />
            );
          })}
          <img
            src={`${contentImage.image.url}?${intermediate.img.src.url.paramsStr}`}
            alt={contentImage.alt}
            className={className}
            width={intermediate.img.width}
            height={intermediate.img.height}
          />
        </picture>
      );
      if (contentImage.asThumb) {
        const largeImage = templateList[idx].largeImage;
        const largeImageUrl = largeImage
          ? imageTransformedUrl(contentImage, largeImage)
          : contentImage.image.url;
        return ReactDomServer.renderToStaticMarkup(
          <a href={largeImageUrl} target="_blank" rel="noopener noreferrer">
            {PictureTag}
          </a>
        );
      }
      return ReactDomServer.renderToStaticMarkup(PictureTag);
    }
    return '';
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

export function imageToHtml(contentImage: ContentImage): string {
  const image = toElm(
    contentImage,
    siteServerSideConfig.imageConfig.contentImageClassName,
    siteServerSideConfig.imageConfig.template
  );
  // normalizeHtml は section の組み立てでコールしたいが、
  // 何か影響ある?
  return normalizedHtml(processorHtml(), image);
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
