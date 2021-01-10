import React, { ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import ArticleList, { ArticlListrComponentVariant } from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';

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
  },
  'SectionItem-content': {
    width: '100%'
  },
  'SectionItem-contentTitle': {
    width: '100%'
  },
  'SectionItem-contentBody': {
    width: '100%'
  }
}));
const classNames = [
  'SectionItem-root',
  'SectionItem-articles',
  'SectionItem-articlesTitleDetail',
  'SectionItem-articlesTitle',
  'SectionItem-articlesList',
  'SectionItem-content',
  'SectionItem-contentTitle',
  'SectionItem-contentBody'
];

export type SectionItemComponentVariant = {
  contentTitleVariant?: TypographyProps['variant'];
  articlesTitleDetailVariant?: TypographyProps['variant'];
  articlesTitleVariant?: TypographyProps['variant'];
  contentTitleComponent?: ElementType<any>;
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
  contentTitleVariant = 'h2',
  articlesTitleDetailVariant = 'h2',
  articlesTitleVariant = 'h2',
  contentTitleComponent = 'h2',
  articlesTitleDetailComponent = 'h2',
  articlesTitleComponent = 'h2',
  articleDetailTitleVariant = 'h3',
  articleDetailTitleComponent = 'h3',
  articleItemTitleVariant = 'body1',
  articleItemTitleComponent = 'span',
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  return (
    <Box component="section" className={classes['SectionItem-root']}>
      {data.kind === 'content' && (
        <Box className={classes['SectionItem-content']}>
          {data.title && (
            <Box className={classes['SectionItem-contentTitle']}>
              <Typography
                variant={contentTitleVariant}
                component={contentTitleComponent}
              >
                {data.title}
              </Typography>
            </Box>
          )}
          <Box className={classes['SectionItem-contentBody']}>
            {data.contentHtml}
          </Box>
        </Box>
      )}
      {data.kind === 'posts' && (
        <Box className={classes['SectionItem-articles']}>
          {data.title &&
            (data.detail ? (
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
            ))}
          <Box className={classes['SectionItem-articlesList']}>
            <ArticleList
              items={data.contents}
              detail={data.detail}
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
      )}
    </Box>
  );
};
export default SectionItem;
