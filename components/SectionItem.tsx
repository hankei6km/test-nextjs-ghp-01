import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import ArticleList from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';
import SectionContext from './SectionContext';
import SiteTitle from './parts/SiteTitle';
import SiteLogo from './parts/SiteLogo';
import PageTitle from './parts/PageTitle';
import ProfileImage from './parts/ProfileImage';
import NavMain from './parts/NavMain';
import DateUpdated from './parts/DateUpdated';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {},
  'SectionItem-contentBody': {},
  'SectionItem-contentArticles': {}
}));
const classNames = [
  'SectionItem-root',
  'SectionItem-title',
  'SectionItem-contentBody',
  'SectionItem-contentArticles'
];

export type SectionItemComponent = {
  sectionComponent: ElementType<any>;
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
  const { component, variant } = useContext(SectionContext);
  return (
    <Box
      component={component.sectionComponent}
      className={classes['SectionItem-root']}
    >
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
          {content.kind === 'partsSiteTitle' && (
            <SiteTitle link={content.link} classes={{ ...inClasses }} />
          )}
          {content.kind === 'partsSiteLogo' && (
            <SiteLogo
              size={content.size}
              link={content.link}
              classes={{ ...inClasses }}
            />
          )}
          {content.kind === 'partsPageTitle' && (
            <PageTitle link={content.link} classes={{ ...inClasses }} />
          )}
          {content.kind === 'partsProfileImage' && (
            <ProfileImage
              size={content.size}
              name={content.name}
              link={content.link}
              classes={{ ...inClasses }}
            />
          )}
          {content.kind === 'partsUpdated' && (
            <DateUpdated classes={{ ...inClasses }} />
          )}
          {content.kind === 'partsNavMain' && (
            <NavMain classes={{ ...inClasses }} />
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
  );
};
export default SectionItem;
