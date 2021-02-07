import { imageMatcherLandscape, imageMatcherPortrait } from './image';

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
  });
});
