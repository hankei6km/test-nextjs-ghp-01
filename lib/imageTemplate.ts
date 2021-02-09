import { ContentImage } from './image';
import { SrcAttr, PictureNode, ImgNode } from './intermediate';

export type ImageMatcher = (content: ContentImage) => boolean;

// サムネイル画像をクリックしたときに開く画像のサイズ再現に使う.
// (ImagteTemplate はタグを作成用なので、href のような場所には向かない)
export type ImageTransform = {
  matcher: ImageMatcher;
  paramsStr: string;
};

export type ImageTemplate = {
  matcher: ImageMatcher;
  intermediate: PictureNode | ImgNode;
  asThumb: boolean;
  largeImage?: ImageTransform;
  overrideParams?: SrcAttr['url']['params'];
  templateSrc?: string;
};

export const imageMatcherLandscape = (
  min: number,
  max: number = -1
): ImageMatcher => {
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
): ImageMatcher => {
  return (content: ContentImage): boolean => {
    if (content.image.height > content.image.width) {
      return (
        min <= content.image.height && (max < 0 || content.image.height <= max)
      );
    }
    return false;
  };
};

export const imageMatcherOr = (
  m1: ImageMatcher,
  m2: ImageMatcher
): ImageMatcher => {
  return (content: ContentImage): boolean => {
    return m1(content) || m2(content);
  };
};

export const imageMatcherTrue = (): ImageMatcher => {
  return (_content: ContentImage): boolean => {
    return true;
  };
};

export function imageTransformedUrl(
  content: ContentImage,
  imageOpenedSize: ImageTransform
): string {
  if (imageOpenedSize.matcher(content)) {
    return `${content.image.url}?${imageOpenedSize.paramsStr}`;
  }
  return content.image.url;
}
