import { markdownToHtml } from './markdown';

describe('markdownToHtml()', () => {
  it('should convert markdown to html ', () => {
    expect(markdownToHtml('## test\ntext text text.')).toEqual(
      '<h2>test</h2><p>text text text.</p>'
    );
    expect(
      markdownToHtml('## test\n[unified](https://unifiedjs.com/).')
    ).toEqual(
      '<h2>test</h2><p><a href="https://unifiedjs.com/">unified</a>.</p>'
    );
    expect(
      markdownToHtml('## test\n[click here](javascript:alret("test")).')
    ).toEqual('<h2>test</h2><p><a>click here</a>.</p>');
  });
});
