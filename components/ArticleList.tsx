import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ArticleItem from './ArticleItem';
import ArticleDetail from './ArticleDetail';
import { SectionArticleIndex } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';

const useStyles = makeStyles(() => ({
  'ArticleList-root': {
    width: '100%',
    padding: 0
  },
  'ArticleList-detailList': {},
  'ArticleList-itemList': {}
}));
const classNames = [
  'ArticleList-root',
  'ArticleList-detailList',
  'ArticleList-itemList'
];

export type ArticleListComponent = {};

export type ArticleListVariant = {};

type Props = {
  items: SectionArticleIndex[];
  detail?: boolean;
  classes?: { [key: string]: string };
};

const ArticleList = ({ items, detail = true, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  return (
    <Box
      component={detail ? 'div' : 'ul'}
      className={`${classes['ArticleList-root']} ${
        detail
          ? classes['ArticleList-detailList']
          : classes['ArticleList-itemList']
      }`}
    >
      {detail ? (
        <>
          {items.map((item) => (
            <ArticleDetail
              key={item.id}
              data={item}
              classes={{ ...inClasses }}
            />
          ))}
        </>
      ) : (
        <>
          {items.map((item) => (
            <ArticleItem key={item.id} data={item} classes={{ ...inClasses }} />
          ))}
        </>
      )}
    </Box>
  );
};

export default ArticleList;
