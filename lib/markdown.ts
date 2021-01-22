import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import gfm from 'remark-gfm';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import merge from 'deepmerge';
import gh from 'hast-util-sanitize/lib/github.json';
import { Schema } from 'hast-util-sanitize';

const schema = merge(gh, {
  tagNames: ['picture', 'source'],
  attributes: { source: ['srcSet', 'sizes'], img: ['srcSet', 'sizes'] }
});
const processorMarkdown = unified()
  .use(markdown)
  .use(gfm)
  .use(remark2rehype)
  .use(rehypeMinifyWhitespace)
  .use(rehypeSanitize, (schema as unknown) as Schema)
  .use(rehypeStringify)
  .freeze();

export function markdownToHtml(markdown: string): string {
  let ret = '';
  processorMarkdown.process(markdown, (err, file) => {
    if (err) {
      console.error(err);
    }
    ret = String(file);
  });
  return ret;
}
