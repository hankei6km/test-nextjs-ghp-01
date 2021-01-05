import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from './Link';
import DateUpdated from './DateUpdated';
import ThumbImage from './ThumbImage';

import { Test1Index } from '../types/client/contentTypes';

const useStyles = makeStyles(() => ({
  title: {
    padding: 0
  },
  content: {
    '& > .MuiCardContent-root': {
      padding: 0
    }
  },
  thumb: {
    // https://stackoverflow.com/questions/23041956/a-tag-is-not-at-the-same-size-of-img-tag-inside-it
    '&>a': {
      fontSize: 0,
      display: 'inline-block'
    }
  },
  actions: {
    padding: 0
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

const ListDetail = ({
  data,
  thumbWidth = 250,
  thumbHeight = 150,
  thumbSizeFit = 'crop'
}: Props) => {
  const classes = useStyles();
  const q = new URLSearchParams('');
  q.append('w', `${thumbWidth}`);
  q.append('h', `${thumbHeight}`);
  q.append('fit', thumbSizeFit);
  const thumbImage = `${data.mainImage || defaultMainImage}?${q.toString()}`;
  const updated = data.revisedAt || data.updatedAt || data.publishedAt;
  return (
    <Card elevation={0} className={classes.content}>
      <CardContent>
        <CardHeader
          className={classes.title}
          title={
            <Typography
              color="textPrimary"
              variant="h4"
              component={Link}
              underline="none"
              href="/test1/[id]"
              as={`/test1/${data.id}`}
            >
              {data.title}
            </Typography>
          }
          subheader={<DateUpdated updated={updated} />}
        />
        <Box my={1} className={classes.thumb}>
          <Link underline="none" href="/test1/[id]" as={`/test1/${data.id}`}>
            <ThumbImage
              src={thumbImage}
              alt={`thumbnail for ${data.title}`}
              thumbWidth={thumbWidth}
              thumbHeight={thumbHeight}
              // title={data.title}
            />
          </Link>
        </Box>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          style={{ textTransform: 'none' }}
          size="small"
          className={'MuiButton-outlinedPrimary'}
          component={Link}
          href="/test1/[id]"
          as={`/test1/${data.id}`}
        >
          {'read more'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListDetail;
