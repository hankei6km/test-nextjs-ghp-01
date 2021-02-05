import ReactDomServer from 'react-dom/server';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import merge from 'deepmerge';
import gh from 'hast-util-sanitize/lib/github.json';
import { Schema } from 'hast-util-sanitize';

const schema = merge(gh, {
  tagNames: ['picture', 'source'],
  attributes: { source: ['srcSet', 'sizes'], img: ['srcSet', 'sizes', 'style'] }
});
const processorHtml = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeMinifyWhitespace)
  .use(rehypeSanitize, (schema as unknown) as Schema)
  .use(rehypeStringify)
  .freeze();

type ContentImage = {
  image: {
    url: string;
    width: number;
    height: number;
  };
  alt: string;
  link?: string;
  newTab?: boolean;
  asThumb?: boolean;
};

function toElm(contentImage: ContentImage) {
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
      width={width}
      height={height}
    />
  );
  if (contentImage.asThumb) {
    return (
      <a
        href={contentImage.image.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {imgTag}
      </a>
    );
  }
  return imgTag;
}

export function imageToHtml(contentImage: ContentImage): string {
  const image = ReactDomServer.renderToStaticMarkup(toElm(contentImage));
  let ret = '';
  processorHtml.process(image, (err, file) => {
    if (err) {
      console.error(err);
    }
    ret = String(file);
  });
  return ret;
}
