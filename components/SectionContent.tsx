import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
  'SectionContent-root': {},
  'SectionContent-contentBody': {},
  'SectionContent-contentArticles': {}
}));
const classNames = [
  'SectionContent-root',
  'SectionContent-contentBody',
  'SectionContent-contentArticles'
];

type Props = {
  content: SectionType['content'][0];
  classes?: { [key: string]: string };
};

const SectionContent = ({ content, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { naked } = useContext(SectionContext);
  const contentNode = (
    <>
      {content.kind === 'html' && (
        <Box dangerouslySetInnerHTML={{ __html: content.contentHtml }}></Box>
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
        <Box className={classes['SectionContent-contentArticles']}>
          <ArticleList
            items={content.contents}
            detail={content.detail}
            classes={{ ...inClasses }}
          />
        </Box>
      )}
    </>
  );
  if (naked) {
    return contentNode;
  }
  return <Box className={classes['SectionContent-root']}>{contentNode}</Box>;
};
export default SectionContent;
