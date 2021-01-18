import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Link from '../components/Link';
import SiteContext from '../components/SiteContext';
import ArticleList from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses, classNameFromConfigField } from '../utils/classes';
import SectionContext from './SectionContext';
import PageTitle from './parts/PageTitle';

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
  'ConfigImage-profileImageLarge-outer': {},
  'ConfigImage-profileImageLarge': {
    width: 240,
    height: 240,
    borderRadius: '9999px'
  },
  'ConfigImage-profileImage-outer': {},
  'ConfigImage-profileImage': {
    width: 140,
    height: 140,
    borderRadius: '9999px'
  },
  'ConfigImage-profileImageSmall-outer': {},
  'ConfigImage-profileImageSmall': {
    width: 80,
    height: 80,
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
  'ConfigImage-profileImageLarge-outer',
  'ConfigImage-profileImageLarge',
  'ConfigImage-profileImage-outer',
  'ConfigImage-profileImage',
  'ConfigImage-profileImageSmall-outer',
  'ConfigImage-profileImageSmall'
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
  const { label, image, sectionConfig } = useContext(SiteContext);
  const { component, variant } = sectionConfig;
  return (
    <SectionContext.Provider value={sectionConfig}>
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
            {content.kind === 'configLabel' &&
              (() => {
                const inner = (
                  <Typography
                    component={
                      (component as { [key: string]: ElementType<any> })[
                        `configLabel-${content.field}-Component`
                      ] || 'span'
                    }
                    variant={
                      (variant as {
                        [key: string]: TypographyProps['variant'];
                      })[`configLabel-${content.field}-Variant`] || 'body1'
                    }
                    className={classNameFromConfigField(
                      classes,
                      `ConfigLabel-${content.field}`
                    )}
                  >
                    {label[content.field]}
                  </Typography>
                );
                if (content.link) {
                  return <Link href={content.link}>{inner}</Link>;
                }
                return inner;
              })()}
            {content.kind === 'configImage' &&
              (() => {
                const inner = (
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
                );
                if (content.link) {
                  return <Link href={content.link}>{inner}</Link>;
                }
                return inner;
              })()}
            {content.kind === 'partsPageTitle' && (
              <PageTitle link={content.link} />
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
