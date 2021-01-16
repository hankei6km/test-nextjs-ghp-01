import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import siteContext from '../components/SiteContext';
import ArticleList from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses, classNameFromConfigField } from '../utils/classes';
import SectionContext, { sectionContextDefault } from './SectionContext';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {
    width: '100%'
  },
  'SectionItem-title': {
    width: '100%'
  },
  'SectionItem-contentBody': {
    width: '100%'
  },
  'SectionItem-contentArticles': {
    width: '100%'
  },
  'ConfigLabel-siteTitle': {},
  'ConfigLabel-profileName': {},
  'ConfigImage-profileImage-outer': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  'ConfigImage-profileImage': {
    width: 240,
    height: 240,
    borderRadius: '9999px'
  }
}));
const classNames = [
  'SectionItem-root',
  'SectionItem-title',
  'SectionItem-contentBody',
  'SectionItem-contentArticles',
  'ConfigLabel-siteTitle',
  'ConfigLabel-profileName',
  'ConfigImage-profileImage-outer',
  'ConfigImage-profileImage'
];

export type SectionItemComponent = {
  sectionTitleComponent: ElementType<any>;
};

export type SectionItemVariant = {
  sectionTitleVariant: TypographyProps['variant'];
};

type Props = {
  data: SectionType;
  classes?: { [key: string]: string };
};

const SectionItem = ({ data, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { label, image } = useContext(siteContext);
  const { component, variant } = sectionContextDefault;
  return (
    <SectionContext.Provider value={sectionContextDefault}>
      <Box component="section" className={classes['SectionItem-root']}>
        {data.title && (
          <Typography
            variant={variant.sectionTitleVariant}
            component={component.sectionTitleComponent}
            className={classes['SectionItem-title']}
          >
            {data.title}
          </Typography>
        )}
        {data.content.map((content, i) => (
          <Box key={i}>
            {content.kind === 'html' && (
              <Box
                className={classes['SectionItem-contentBody']}
                dangerouslySetInnerHTML={{ __html: content.contentHtml }}
              ></Box>
            )}
            {content.kind === 'configLabel' && (
              <Box
                className={classNameFromConfigField(
                  classes,
                  `ConfigLabel-${content.field}`
                )}
              >
                {label[content.field]}
              </Box>
            )}
            {content.kind === 'configImage' && (
              <Box
                className={classNameFromConfigField(
                  classes,
                  `ConfigImage-${content.field}-outer`
                )}
              >
                <img
                  src={image[content.field]}
                  alt=""
                  className={classNameFromConfigField(
                    classes,
                    `ConfigImage-${content.field}`
                  )}
                />
              </Box>
            )}
            {content.kind === 'posts' && (
              <Box className={classes['SectionItem-contentArticles']}>
                <ArticleList
                  items={content.contents}
                  detail={content.detail}
                  classes={{ ...inClasses }}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </SectionContext.Provider>
  );
};
export default SectionItem;
