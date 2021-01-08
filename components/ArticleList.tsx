import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ArticleItem, { ArticleItemComponentVariant } from './ArticleItem';
import ArticleDetail, { ArticleDetailComponentVariant } from './ArticleDetail';
import { ArticleIndex } from '../types/client/contentTypes';

const useStyles = makeStyles(() => ({
  'ArticleList-root': {
    width: '100%',
    padding: 0
  },
  'ArticleList-content': {},
  'ArticleList-itemDetail': {
    width: '100%'
  },
  'ArticleList-item': {
    width: '100%',
    listStyle: 'none'
  }
}));

export type ArticlListrComponentVariant = ArticleDetailComponentVariant &
  ArticleItemComponentVariant;
type Props = {
  items: ArticleIndex[];
  detail?: boolean;
  classes?: { [key: string]: string };
} & ArticlListrComponentVariant;

const ArticleList = ({
  items,
  detail = true,
  classes: inClasses,
  articleDetailComponent = 'article',
  articleItemComponent,
  articleDetailTitleVariant = 'h3',
  articleDetailTitleComponent = 'h3',
  articleItemTitleVariant = 'body1',
  articleItemTitleComponent = 'span'
}: Props) => {
  const classes = useStyles({ classes: inClasses });
  return (
    <>
      <Box
        component={detail ? 'div' : 'ul'}
        className={classes['ArticleList-root']}
      >
        {items.map((item) => (
          <Box key={item.id}>
            {detail ? (
              <Box className={classes['ArticleList-itemDetail']}>
                <ArticleDetail
                  data={item}
                  classes={{ ...inClasses }}
                  articleDetailComponent={articleDetailComponent}
                  articleDetailTitleVariant={articleDetailTitleVariant}
                  articleDetailTitleComponent={articleDetailTitleComponent}
                />
              </Box>
            ) : (
              <Box component="li" className={classes['ArticleList-item']}>
                <ArticleItem
                  data={item}
                  classes={{ ...inClasses }}
                  articleItemComponent={articleItemComponent}
                  articleItemTitleVariant={articleItemTitleVariant}
                  articleItemTitleComponent={articleItemTitleComponent}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ArticleList;
