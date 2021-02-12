import { styleToJsxStyle, htmlToChildren } from './html';

describe('styleToJsxStyle()', () => {
  it('should returns jsx style from style attribute', () => {
    expect(styleToJsxStyle('max-width:100%')).toEqual({ maxWidth: '100%' });
    expect(styleToJsxStyle('max-width:100%; background-color:red;')).toEqual({
      maxWidth: '100%',
      backgroundColor: 'red'
    });
    // https://stackoverflow.com/questions/32100495/how-do-i-apply-vendor-prefixes-to-inline-styles-in-reactjs
    expect(styleToJsxStyle('-webkit-transform: rotate(90deg)')).toEqual({
      WebkitTransform: 'rotate(90deg)'
    });
    expect(
      styleToJsxStyle('width:500;height:200px;-webkit-transform: rotate(90deg)')
    ).toEqual({
      width: '500',
      height: '200px',
      WebkitTransform: 'rotate(90deg)'
    });
  });
});

describe('htmlToChildren()', () => {
  it('should returns spread html array', () => {
    expect(htmlToChildren('<p>test</p>')).toEqual([
      { tagName: 'p', style: {}, attribs: {}, html: 'test' }
    ]);
    expect(htmlToChildren('<p>test1</p><p id="t2">test2</p>')).toEqual([
      { tagName: 'p', style: {}, attribs: {}, html: 'test1' },
      { tagName: 'p', style: {}, attribs: { id: 't2' }, html: 'test2' }
    ]);
    expect(
      htmlToChildren('<p>test1</p><p id="t2" class="c2">test2</p>')
    ).toEqual([
      { tagName: 'p', style: {}, attribs: {}, html: 'test1' },
      {
        tagName: 'p',
        style: {},
        attribs: { id: 't2', className: 'c2' },
        html: 'test2'
      }
    ]);
    expect(htmlToChildren('<p>test1</p><hr/><p>test2</p>')).toEqual([
      { tagName: 'p', style: {}, attribs: {}, html: 'test1' },
      { tagName: 'hr', style: {}, attribs: {}, html: '' },
      { tagName: 'p', style: {}, attribs: {}, html: 'test2' }
    ]);
    expect(htmlToChildren('<img src="/abc" alt="abc thumb"/>')).toEqual([
      {
        tagName: 'img',
        style: {},
        attribs: { src: '/abc', alt: 'abc thumb' },
        html: ''
      }
    ]);
    expect(
      htmlToChildren(
        '<img src="/abc" alt="abc thumb" data-opt="?q=123&abc=efg"/>'
      )
    ).toEqual([
      {
        tagName: 'img',
        style: {},
        attribs: {
          src: '/abc',
          alt: 'abc thumb',
          'data-opt': '?q=123&abc=efg' // dataSet ではない?
        },
        html: ''
      }
    ]);
    expect(
      htmlToChildren('<a href="/"><img src="/abc" alt="abc thumb"/></a>')
    ).toEqual([
      {
        tagName: 'a',
        style: {},
        attribs: { href: '/' },
        html: '<img src="/abc" alt="abc thumb">'
      }
    ]);
    expect(
      htmlToChildren('<a href="/"><p>test1</p>test2<p class="c3">test3</p></a>')
    ).toEqual([
      {
        tagName: 'a',
        style: {},
        attribs: { href: '/' },
        html: '<p>test1</p>test2<p class="c3">test3</p>'
      }
    ]);
    expect(
      htmlToChildren(
        '<p>test1</p><a href="/" id="a1" class="ca" ><img src="/abc" alt="abc thumb" data-opt="?q=123&abc=efg"/></a><p>test2</p>'
      )
    ).toEqual([
      { tagName: 'p', style: {}, attribs: {}, html: 'test1' },
      {
        tagName: 'a',
        style: {},
        attribs: { href: '/', id: 'a1', className: 'ca' },
        html: '<img src="/abc" alt="abc thumb" data-opt="?q=123&amp;abc=efg">'
      },
      { tagName: 'p', style: {}, attribs: {}, html: 'test2' }
    ]);
    expect(
      htmlToChildren('<img src="/abc" alt="abc thumb" style="maxWidth:100%" />')
    ).toEqual([
      {
        tagName: 'img',
        style: {
          maxWidth: '100%'
        },
        attribs: { src: '/abc', alt: 'abc thumb' },
        html: ''
      }
    ]);
  });
  it('should fallbacked', () => {
    expect(htmlToChildren('')).toEqual([
      { tagName: 'div', style: {}, attribs: {}, html: '' }
    ]);
    expect(htmlToChildren('test')).toEqual([
      { tagName: 'div', style: {}, attribs: {}, html: 'test' }
    ]);
    expect(htmlToChildren('test<p>123</p><hr/>abc')).toEqual([
      { tagName: 'div', style: {}, attribs: {}, html: 'test<p>123</p><hr/>abc' }
    ]);
    expect(htmlToChildren('test<p>123</p><hr/>abc')).toEqual([
      { tagName: 'div', style: {}, attribs: {}, html: 'test<p>123</p><hr/>abc' }
    ]);
    expect(
      htmlToChildren('<p>test</p><button>abc</button><p>test</p>')
    ).toEqual([
      {
        tagName: 'div',
        style: {},
        attribs: {},
        html: '<p>test</p><button>abc</button><p>test</p>'
      }
    ]);
  });
});
