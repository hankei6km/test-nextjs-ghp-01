import React from 'react';
import Box from '@material-ui/core/Box';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItem from './ListItem';
import ListDetail from './ListDetail';
import { PostsIndex } from '../types/client/contentTypes';

type Props = {
  items: PostsIndex[];
  detail?: boolean;
};

const List = ({ items, detail = true }: Props) => (
  <MuiList dense disablePadding>
    {items.map((item) => (
      <MuiListItem dense divider={detail} key={item.id}>
        {detail ? (
          <Box my={1} width="100%">
            <ListDetail data={item} />
          </Box>
        ) : (
          <Box my={0} width="100%">
            <ListItem data={item} />
          </Box>
        )}
      </MuiListItem>
    ))}
  </MuiList>
);

export default List;
