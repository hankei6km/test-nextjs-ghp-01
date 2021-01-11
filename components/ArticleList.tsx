import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ArticleItem from './ArticleItem';
import ArticleDetail from './ArticleDetail';
import { ArticleIndex } from '../types/client/contentTypes';
import { pruneClasses } from '../utils/classes';

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
const classNames = [
  'ArticleList-root',
  'ArticleList-content',
  'ArticleList-itemDetail',
  'ArticleList-item'
];

export type ArticleListComponent = {};

export type ArticleListVariant = {};

type Props = {
  items: ArticleIndex[];
  detail?: boolean;
  classes?: { [key: string]: string };
};

const ArticleList = ({ items, detail = true, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
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
                <ArticleDetail data={item} classes={{ ...inClasses }} />
              </Box>
            ) : (
              <Box component="li" className={classes['ArticleList-item']}>
                <ArticleItem data={item} classes={{ ...inClasses }} />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ArticleList;
