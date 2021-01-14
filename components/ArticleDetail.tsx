import React, { ElementType, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Link from './Link';
import DateUpdated from './DateUpdated';
import ThumbImage from './ThumbImage';
import { pruneClasses } from '../utils/classes';
import SectionContext from './SectionContext';
import { join } from 'path';
import { SectionArticleIndex } from '../types/pageTypes';

const useStyles = makeStyles(() => ({
  'ArticleDetail-root': {
    width: '100%'
  },
  'ArticleDetail-header': {
    width: '100%'
  },
  'ArticleDetail-content': {
    width: '100%'
  },
  'ArticleDetail-footer': {
    width: '100%'
  },
  'ArticleDetail-title': {},
  'ArticleDetail-updated': {},
  'ArticleDetail-thumbImage': {
    // https://stackoverflow.com/questions/23041956/a-tag-is-not-at-the-same-size-of-img-tag-inside-it
    '&>a': {
      fontSize: 0,
      display: 'inline-block'
    }
  }
}));
const classNames = [
  'ArticleDetail-root',
  'ArticleDetail-header',
  'ArticleDetail-content',
  'ArticleDetail-footer',
  'ArticleDetail-title',
  'ArticleDetail-updated',
  'ArticleDetail-thumbImage'
];

export type ArticleDetailComponent = {
  articleDetailComponent: ElementType<any>;
  articleDetailTitleComponent: ElementType<any>;
};
export type ArticleDetailVariant = {
  articleDetailTitleVariant: TypographyProps['variant'];
};

type Props = {
  data: SectionArticleIndex;
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
    <Box
      component={component.articleDetailComponent}
      className={classes['ArticleDetail-root']}
    >
      <Box component="header" className={classes['ArticleDetail-header']}>
        <Typography
          color="textPrimary"
          variant={variant.articleDetailTitleVariant}
          component={component.articleDetailTitleComponent}
          className={classes['ArticleDetail-title']}
        >
          <Link
            underline="none"
            href={join(data.path, '[id]')}
            as={join(data.path, data.id)}
          >
            {data.title}
          </Link>
        </Typography>
        <Box className={classes['ArticleDetail-updated']}>
          {<DateUpdated updated={updated} />}
        </Box>
      </Box>
      <Box className={classes['ArticleDetail-content']}>
        <Box className={classes['ArticleDetail-thumbImage']}>
          <Link
            underline="none"
            href={join(data.path, '[id]')}
            as={join(data.path, data.id)}
          >
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
      </Box>
      <Box component="footer" className={classes['ArticleDetail-footer']}>
        <Button
          style={{ textTransform: 'none' }}
          size="small"
          className={'MuiButton-outlinedPrimary'}
          component={Link}
          href={join(data.path, '[id]')}
          as={join(data.path, data.id)}
        >
          {'read more'}
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleDetail;
