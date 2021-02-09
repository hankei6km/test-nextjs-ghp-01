import {
  imageMatcherLandscape,
  imageMatcherPortrait,
  imageTransformedUrl,
  imageMatcherOr,
  imageMatcherTrue
} from './imageTemplate';

describe('imageMatcherLandscape()', () => {
  it('should match content', () => {
    expect(
      imageMatcherLandscape(0)({
        image: {
          url: '',
          width: 1000,
          height: 600
        },
        alt: 'test'
      })
    ).toBeTruthy();
    expect(
      imageMatcherLandscape(0)({
        image: {
          url: '',
          width: 1000,
          height: 1000
        },
        alt: 'test'
      })
    ).toBeTruthy();
    expect(
      imageMatcherPortrait(0)({
        image: {
          url: '',
          width: 600,
          height: 1000
        },
        alt: 'test'
      })
    ).toBeTruthy();
    expect(
      imageMatcherOr(
        imageMatcherPortrait(0),
        imageMatcherLandscape(0)
      )({
        image: {
          url: '',
          width: 1000,
          height: 600
        },
        alt: 'test'
      })
    ).toBeTruthy();
    expect(
      imageMatcherTrue()({
        image: {
          url: '',
          width: 1000,
          height: 600
        },
        alt: 'test'
      })
    ).toBeTruthy();
  });
  it('should not match content', () => {
    expect(
      imageMatcherLandscape(0)({
        image: {
          url: '',
          width: 600,
          height: 1000
        },
        alt: 'test'
      })
    ).not.toBeTruthy();
    expect(
      imageMatcherPortrait(0)({
        image: {
          url: '',
          width: 1000,
          height: 600
        },
        alt: 'test'
      })
    ).not.toBeTruthy();
    expect(
      imageMatcherPortrait(0)({
        image: {
          url: '',
          width: 1000,
          height: 1000
        },
        alt: 'test'
      })
    ).not.toBeTruthy();
    expect(
      imageMatcherOr(
        imageMatcherPortrait(2000),
        imageMatcherLandscape(2000)
      )({
        image: {
          url: '',
          width: 1000,
          height: 600
        },
        alt: 'test'
      })
    ).not.toBeTruthy();
  });
});

describe('imageTransformedUrl()', () => {
  it('should returns transformed url', () => {
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 2000, height: 1200 }, alt: 'test' },
        {
          matcher: imageMatcherLandscape(1500),
          paramsStr: 'w=1500'
        }
      )
    ).toEqual('dummy-url?w=1500');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 600, height: 1200 }, alt: 'test' },
        {
          matcher: imageMatcherPortrait(1000),
          paramsStr: 'h=1000'
        }
      )
    ).toEqual('dummy-url?h=1000');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 2000, height: 1200 }, alt: 'test' },
        {
          matcher: imageMatcherOr(
            imageMatcherLandscape(1500),
            imageMatcherPortrait(1500)
          ),
          paramsStr: 'fit=crop&w=1500&h=1500'
        }
      )
    ).toEqual('dummy-url?fit=crop&w=1500&h=1500');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 1200, height: 2000 }, alt: 'test' },
        {
          matcher: imageMatcherOr(
            imageMatcherLandscape(1500),
            imageMatcherPortrait(1500)
          ),
          paramsStr: 'fit=crop&w=1500&h=1500'
        }
      )
    ).toEqual('dummy-url?fit=crop&w=1500&h=1500');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 500, height: 300 }, alt: 'test' },
        {
          matcher: imageMatcherTrue(),
          paramsStr: 'monochrome=ff9b9b9b'
        }
      )
    ).toEqual('dummy-url?monochrome=ff9b9b9b');
  });
  it('should passthru url', () => {
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 2000, height: 1200 }, alt: 'test' },
        {
          matcher: imageMatcherLandscape(2500),
          paramsStr: 'w=1500'
        }
      )
    ).toEqual('dummy-url');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 600, height: 1200 }, alt: 'test' },
        {
          matcher: imageMatcherPortrait(1500),
          paramsStr: 'h=1000'
        }
      )
    ).toEqual('dummy-url');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 2000, height: 1200 }, alt: 'test' },
        {
          matcher: imageMatcherOr(
            imageMatcherLandscape(2500),
            imageMatcherPortrait(2500)
          ),
          paramsStr: 'fit=crop&w=1500&h=1500'
        }
      )
    ).toEqual('dummy-url');
    expect(
      imageTransformedUrl(
        { image: { url: 'dummy-url', width: 1200, height: 2000 }, alt: 'test' },
        {
          matcher: imageMatcherOr(
            imageMatcherLandscape(2500),
            imageMatcherPortrait(2500)
          ),
          paramsStr: 'fit=crop&w=1500&h=1500'
        }
      )
    ).toEqual('dummy-url');
  });
});
