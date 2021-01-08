import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArticleList from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {
    width: '100%'
  },
  'SectionItem-postsOuter': {
    width: '100%'
  },
  'SectionItem-titlePostsDetailOuter': {
    width: '100%'
  },
  'SectionItem-titlePostsOuter': {
    width: '100%'
  }
}));

type Props = {
  data: SectionType;
  classes?: { [key: string]: string };
};

const SectionItem = ({ data, classes: c }: Props) => {
  const classes = useStyles({ classes: c });
  return (
    <Box component="section" className={classes['SectionItem-root']}>
      {data.kind === 'posts' ? (
        <Box className={classes['SectionItem-postsOuter']}>
          {data.detail ? (
            <Box className={classes['SectionItem-titlePostsDetailOuter']}>
              <Typography variant="h2" component="h2">
                {data.title}
              </Typography>
            </Box>
          ) : (
            <Box className={classes['SectionItem-titlePostsOuter']}>
              <Typography variant="h2" component="h2">
                {data.title}
              </Typography>
            </Box>
          )}
          <ArticleList items={data.contents} />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
export default SectionItem;
