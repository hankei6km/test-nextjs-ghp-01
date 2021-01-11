import React, { ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import ArticleList from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';
import SectionContext, { sectionContextDefault } from './SectionContext';

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
  'SectionItem-content',
  'SectionItem-contentTitle',
  'SectionItem-contentBody'
];

export type SectionItemComponent = {
  contentTitleComponent: ElementType<any>;
  articlesTitleDetailComponent: ElementType<any>;
  articlesTitleComponent: ElementType<any>;
};

export type SectionItemVariant = {
  contentTitleVariant: TypographyProps['variant'];
  articlesTitleDetailVariant: TypographyProps['variant'];
  articlesTitleVariant: TypographyProps['variant'];
};

type Props = {
  data: SectionType;
  classes?: { [key: string]: string };
};

const SectionItem = ({ data, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { component, variant } = sectionContextDefault;
  return (
    <SectionContext.Provider value={sectionContextDefault}>
      <>
        {data.kind === 'content' && (
          <Box
            component="section"
            className={`${classes['SectionItem-root']} ${classes['SectionItem-content']}`}
          >
            {data.title && (
              <Typography
                variant={variant.contentTitleVariant}
                component={component.contentTitleComponent}
                className={classes['SectionItem-contentTitle']}
              >
                {data.title}
              </Typography>
            )}
            <Box className={classes['SectionItem-contentBody']}>
              {data.contentHtml}
            </Box>
          </Box>
        )}
        {data.kind === 'posts' && (
          <Box
            className={`${classes['SectionItem-root']} ${classes['SectionItem-articles']}`}
          >
            {data.title &&
              (data.detail ? (
                <Typography
                  variant={variant.articlesTitleDetailVariant}
                  component={component.articlesTitleDetailComponent}
                  className={classes['SectionItem-articlesTitleDetail']}
                >
                  {data.title}
                </Typography>
              ) : (
                <Typography
                  variant={variant.articlesTitleVariant}
                  component={component.articlesTitleComponent}
                  className={classes['SectionItem-articlesTitle']}
                >
                  {data.title}
                </Typography>
              ))}
            <ArticleList
              items={data.contents}
              detail={data.detail}
              classes={{ ...inClasses }}
            />
          </Box>
        )}
      </>
    </SectionContext.Provider>
  );
};
export default SectionItem;
