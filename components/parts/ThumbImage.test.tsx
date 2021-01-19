import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { act } from 'react-test-renderer';

import ThumbImage from './ThumbImage';
import { mockImage } from '../../test/testUtils';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('ThumbImage', () => {
  it('should renders img after Image.onLoad', async () => {
    const addEventListener = jest.fn();
    // .mockImplementation((_type: string, fn: () => void) => {
    //   setTimeout(fn, 1);
    // });
    global.Image = mockImage(jest.fn(), addEventListener);

    await act(async () => {
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

      await new Promise<void>((resolve) => {
        // useEEffect 待ち、タイミング依存.
        // 下記の方法では hadleOnload を非同期に実行するとact の外に出てしまう.
        // https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks
        setTimeout(() => {
          expect(addEventListener).toHaveBeenCalled();
          addEventListener.mock.calls[0][1]();
          const img = container.querySelector('img');
          expect(img).toBeInTheDocument();
          resolve();
        }, 10);
      });
    });
  });

  it('should be set thumbnail attributes into contained Image', () => {
    // mockImplementation だと mock.instances でプロパティの値が参照できなかった
    // そういう風に使うものではない?
    const image = jest.fn();
    image.prototype.addEventListener = jest.fn();
    image.prototype.removeEventListener = jest.fn();
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
