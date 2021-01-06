import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from './Link';
import DateUpdated from './DateUpdated';
import ThumbImage from './ThumbImage';

import { Test1Index } from '../types/client/contentTypes';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  thumb: {
    // https://stackoverflow.com/questions/23041956/a-tag-is-not-at-the-same-size-of-img-tag-inside-it
    '&>a': {
      fontSize: 0,
      display: 'inline-block'
    }
  }
}));

type Props = {
  data: Test1Index;
  thumbWidth?: number;
  thumbHeight?: number;
  thumbSizeFit?: '' | 'crop'; // とりあえず
};

// TODO: config 作成
const defaultMainImage =
  'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png';

const ListItem = ({
  data,
  thumbWidth = 100,
  thumbHeight = 60,
  thumbSizeFit = 'crop'
}: Props) => {
  const classes = useStyles();
  const thumbImage = data.mainImage || defaultMainImage;
  const updated = data.revisedAt || data.updatedAt || data.publishedAt;
  return (
    <Paper
      elevation={0}
      className={classes.root}
      // component={Link}
      // href="/test1/[id]"
      // as={`/test1/${data.id}`}
    >
      <Box display="flex" py={1}>
        <Box className={classes.thumb}>
          <Link href="/test1/[id]" as={`/test1/${data.id}`}>
            <ThumbImage
              src={thumbImage}
              alt={`thumbnail for ${data.title}`}
              thumbWidth={thumbWidth}
              thumbHeight={thumbHeight}
              thumbSizeFit={thumbSizeFit}
            />
          </Link>
        </Box>
        <Box
          mx={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <Typography
            component={Link}
            href="/test1/[id]"
            as={`/test1/${data.id}`}
            variant="body1"
          >
            {data.title}
          </Typography>
          <DateUpdated updated={updated} />
        </Box>
      </Box>
    </Paper>
  );
};

export default ListItem;
