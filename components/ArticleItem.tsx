import React, { ElementType, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Link from './Link';
import DateUpdated from './DateUpdated';
import ThumbImage from './ThumbImage';
import { pruneClasses } from '../utils/classes';
import SectionContext from './SectionContext';

import { ArticleIndex } from '../types/client/contentTypes';

const useStyles = makeStyles((theme) => ({
  'ArticleItem-root': {
    width: '100%',
    display: 'flex',
    listStyle: 'none'
  },
  'ArticleItem-thumbnImage': {
    // https://stackoverflow.com/questions/23041956/a-tag-is-not-at-the-same-size-of-img-tag-inside-it
    '&>a': {
      fontSize: 0,
      display: 'inline-block'
    }
  },
  'ArticleItem-item': {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  'ArticleItem-title': {},
  'ArticleItem-updated': {}
}));
const classNames = [
  'ArticleItem-root',
  'ArticleItem-thumbnImage',
  'ArticleItem-item',
  'ArticleItem-title',
  'ArticleItem-updated'
];

export type ArticleItemComponent = {
  articleItemComponent: ElementType<any>;
  articleItemTitleComponent: ElementType<any>;
};

export type ArticleItemVariant = {
  articleItemTitleVariant: TypographyProps['variant'];
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

const ArticleItem = ({
  data,
  thumbWidth = 100,
  thumbHeight = 60,
  thumbSizeFit = 'crop',
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { component, variant } = useContext(SectionContext);
  const thumbImage = data.mainImage || defaultMainImage;
  const updated = data.revisedAt || data.updatedAt || data.publishedAt;
  return (
    <Box
      component={component.articleItemComponent}
      className={classes['ArticleItem-root']}
    >
      <Box className={classes['ArticleItem-thumbnImage']}>
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
      <Box className={classes['ArticleItem-item']}>
        <Typography
          className={classes['ArticleItem-title']}
          variant={variant.articleItemTitleVariant}
          component={component.articleItemTitleComponent}
        >
          <Link href="/test1/[id]" as={`/test1/${data.id}`}>
            {data.title}
          </Link>
        </Typography>
        <Box className={classes['ArticleItem-updated']}>
          <DateUpdated updated={updated} />
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleItem;
