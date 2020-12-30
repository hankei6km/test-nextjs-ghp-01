import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  thumb: {
    opacity: 1,
    transition: 'opacity .3s',
    '&:hover': {
      opacity: 0.5
    }
  }
}));

type Props = {
  src: string;
  alt: string;
  thumbWidth: number;
  thumbHeight: number;
  thumbSizeFit?: '' | 'crop'; // とりあえず
};

const ThumbImage = ({
  src,
  alt,
  thumbWidth,
  thumbHeight,
  thumbSizeFit = 'crop'
}: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const q = new URLSearchParams('');
  q.append('w', `${thumbWidth}`);
  q.append('h', `${thumbHeight}`);
  q.append('fit', thumbSizeFit);

  const thumbOuterRef = useCallback(
    (node) => {
      if (node !== null && image !== null && node.children.length === 0) {
        // https://stackoverflow.com/questions/58695126/how-to-use-the-image-constructor-in-react
        node.appendChild(image);
        setImage(null);
      }
    },
    [image]
  );

  useEffect(() => {
    const img = new Image(thumbWidth, thumbHeight);
    const handleLoad = () => {
      setLoading(false);
      setImage(img);
    };
    img.addEventListener('load', handleLoad);
    img.alt = alt;
    img.src = src;
    return () => {
      img.removeEventListener('load', handleLoad);
      setImage(null);
    };
  }, [src, alt, thumbWidth, thumbHeight]);

  return (
    <>
      {loading ? (
        <Skeleton
          component="div"
          variant="rect"
          width={thumbWidth}
          height={thumbHeight}
        />
      ) : (
        <div className={classes.thumb} ref={thumbOuterRef} />
      )}
    </>
  );
};

export default ThumbImage;
