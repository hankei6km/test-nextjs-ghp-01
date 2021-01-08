import React from 'react';
import Box from '@material-ui/core/Box';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ArticleItem from './ArticleItem';
import ArticleDetail from './ArticleDetail';
import { ArticleIndex } from '../types/client/contentTypes';

type Props = {
  items: ArticleIndex[];
  detail?: boolean;
};

const ArticleList = ({ items, detail = true }: Props) => (
  <MuiList dense disablePadding>
    {items.map((item) => (
      <MuiListItem dense divider={detail} key={item.id}>
        {detail ? (
          <Box my={1} width="100%">
            <ArticleDetail data={item} />
          </Box>
        ) : (
          <Box my={0} width="100%">
            <ArticleItem data={item} />
          </Box>
        )}
      </MuiListItem>
    ))}
  </MuiList>
);

export default ArticleList;
