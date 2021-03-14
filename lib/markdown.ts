import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import gfm from 'remark-gfm';

// markdown は normalize された HTML を作成するための
// ソースの１種類というように扱う.

export function processorMarkdownToHtml() {
  return unified().use(markdown).use(gfm).use(remark2rehype);
}
