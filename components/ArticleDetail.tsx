import React, { ElementType, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Link from './Link';
import DateUpdated from './DateUpdated';
import ThumbImage from './ThumbImage';
import { pruneClasses } from '../utils/classes';
import SectionContext from './SectionContext';

import { ArticleIndex } from '../types/client/contentTypes';

const useStyles = makeStyles(() => ({
  'ArticleDetail-root': {
    width: '100%',
    '& > .MuiCardContent-root': {
      padding: 0
    }
  },
  'ArticleDetail-content': {},
  'ArticleDetail-title': {
    padding: 0
  },
  'ArticleDetail-thumbImage': {
    // https://stackoverflow.com/questions/23041956/a-tag-is-not-at-the-same-size-of-img-tag-inside-it
    '&>a': {
      fontSize: 0,
      display: 'inline-block'
    }
  },
  'ArticleDetail-actions': {
    padding: 0
  }
}));
const classNames = [
  'ArticleDetail-root',
  'ArticleDetail-content',
  'ArticleDetail-title',
  'ArticleDetail-thumbImage',
  'ArticleDetail-actions'
];

export type ArticleDetailComponent = {
  articleDetailComponent: ElementType<any>;
  articleDetailTitleComponent: ElementType<any>;
};
export type ArticleDetailVariant = {
  articleDetailTitleVariant: TypographyProps['variant'];
};

type Props = {
  data: ArticleIndex;
  thumbWidth?: number;
  thumbHeight?: number;
  thumbSizeFit?: '' | 'crop'; // とりあえず
  classes?: { [key: string]: string };
};

// TODO: config 作成
const defaultMainImage =
  'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png';

const ArticleDetail = ({
  data,
  thumbWidth = 250,
  thumbHeight = 150,
  thumbSizeFit = 'crop',
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { component, variant } = useContext(SectionContext);
  const thumbImage = data.mainImage || defaultMainImage;
  const updated = data.revisedAt || data.updatedAt || data.publishedAt;
  return (
    <Card elevation={0} className={classes['ArticleDetail-root']}>
      <CardContent
        component={component.articleDetailComponent}
        className={classes['ArticleDetail-content']}
      >
        <CardHeader
          className={classes['ArticleDetail-title']}
          title={
            <Link underline="none" href="/test1/[id]" as={`/test1/${data.id}`}>
              <Typography
                color="textPrimary"
                variant={variant.articleDetailTitleVariant}
                component={component.articleDetailTitleComponent}
              >
                {data.title}
              </Typography>
            </Link>
          }
          subheader={<DateUpdated updated={updated} />}
        />
        <Box className={classes['ArticleDetail-thumbImage']}>
          <Link underline="none" href="/test1/[id]" as={`/test1/${data.id}`}>
            <ThumbImage
              src={thumbImage}
              alt={`thumbnail for ${data.title}`}
              thumbWidth={thumbWidth}
              thumbHeight={thumbHeight}
              thumbSizeFit={thumbSizeFit}
              // title={data.title}
            />
          </Link>
        </Box>
      </CardContent>
      <CardActions className={classes['ArticleDetail-actions']}>
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

export default ArticleDetail;
