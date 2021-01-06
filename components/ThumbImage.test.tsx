import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ThumbImage from './ThumbImage';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

function mockImage(
  addEventListener = jest.fn(),
  removeEventListener = jest.fn()
) {
  // mockImplementation だと mock.instances でプロパティの値が参照できなかった
  // そういう風に使うものではない?
  const image = jest.fn();
  image.prototype.addEventListener = addEventListener;
  image.prototype.removeEventListener = removeEventListener;
  return image;
}

describe('ThumbImage', () => {
  it('should not rendered img before Image.onLoad', () => {
    global.Image = mockImage();
    const { container } = render(
      <ThumbImage
        src="/path/to/image.png"
        alt="thumbIamge"
        thumbWidth={400}
        thumbHeight={100}
      />
    );
    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();
  });
  it('should be set thumbnail attributes into contained Image', () => {
    const image = mockImage();
    global.Image = image;
    render(
      <ThumbImage
        src="/path/to/image.png"
        alt="thumbImage"
        thumbWidth={400}
        thumbHeight={100}
      />
    );
    expect(image).toHaveBeenCalledWith(400, 100);
    expect(image.mock.instances[0].src).toEqual(
      '/path/to/image.png?w=400&h=100&fit=crop'
    );
    expect(image.mock.instances[0].alt).toEqual('thumbImage');
  });
});
