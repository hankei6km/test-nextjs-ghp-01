import React, { ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import ArticleList, { ArticlListrComponentVariant } from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {
    width: '100%'
  },
  'SectionItem-articles': {
    width: '100%'
  },
  'SectionItem-articlesTitleDetail': {
    width: '100%'
  },
  'SectionItem-articlesTitle': {
    width: '100%'
  },
  'SectionItem-articlesList': {
    width: '100%'
  }
}));

export type SectionItemComponentVariant = {
  contentTitleDetailVariant?: TypographyProps['variant'];
  articlesTitleDetailVariant?: TypographyProps['variant'];
  articlesTitleVariant?: TypographyProps['variant'];
  contentTitleDetailComponent?: ElementType<any>;
  articlesTitleDetailComponent?: ElementType<any>;
  articlesTitleComponent?: ElementType<any>;
} & ArticlListrComponentVariant;

type Props = {
  data: SectionType;
  classes?: { [key: string]: string };
} & SectionItemComponentVariant;

const SectionItem = ({
  data,
  articleDetailComponent = 'article',
  articleItemComponent,
  // contentTitleDetailVariant = 'h2',
  articlesTitleDetailVariant = 'h2',
  articlesTitleVariant = 'h2',
  // contentTitleDetailComponent = 'h2',
  articlesTitleDetailComponent = 'h2',
  articlesTitleComponent = 'h2',
  articleDetailTitleVariant = 'h3',
  articleDetailTitleComponent = 'h3',
  articleItemTitleVariant = 'body1',
  articleItemTitleComponent = 'span',
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: inClasses });
  return (
    <Box component="section" className={classes['SectionItem-root']}>
      {data.kind === 'posts' ? (
        <Box className={classes['SectionItem-articles']}>
          {data.detail ? (
            <Box className={classes['SectionItem-articlesTitleDetail']}>
              <Typography
                variant={articlesTitleDetailVariant}
                component={articlesTitleDetailComponent}
              >
                {data.title}
              </Typography>
            </Box>
          ) : (
            <Box className={classes['SectionItem-articlesTitle']}>
              <Typography
                variant={articlesTitleVariant}
                component={articlesTitleComponent}
              >
                {data.title}
              </Typography>
            </Box>
          )}
          <Box className={classes['SectionItem-articlesList']}>
            <ArticleList
              items={data.contents}
              classes={{ ...inClasses }}
              articleDetailComponent={articleDetailComponent}
              articleItemComponent={articleItemComponent}
              articleDetailTitleVariant={articleDetailTitleVariant}
              articleDetailTitleComponent={articleDetailTitleComponent}
              articleItemTitleVariant={articleItemTitleVariant}
              articleItemTitleComponent={articleItemTitleComponent}
            />
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
export default SectionItem;
