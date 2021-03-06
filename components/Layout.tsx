import React, { useContext, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
// import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import siteContext from '../components/SiteContext';
import { mergeSectionConfig } from '../components/SectionContext';
import { PageData } from '../types/pageTypes';
import SectionList from './SectionList';
import { pruneClasses } from '../utils/classes';
import SectionItem from './SectionItem';
import siteConfig from '../src/site.config';
import { wrapStyle } from '../utils/classes';

const useStyles = makeStyles((theme) => ({
  'LayoutHeader-root': {},
  'LayoutHeader-sectionTop': {},
  'LayoutHeader-sectionList': {},
  'LayoutContaienr-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'start'
    },
    width: '100%'
  },
  'LayoutContaienr-body': {
    flexGrow: 1,
    maxWidth: theme.breakpoints.values.sm
  },
  'LayoutContaienrTop-sectionList-inner': {
    width: '100%',
    maxWidth: theme.breakpoints.values.sm,
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 50,
      display: 'block',
      width: 300
    }
  },
  'LayoutContaienrBottom-sectionList-inner': {
    width: '100%',
    maxWidth: theme.breakpoints.values.sm,
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 50,
      display: 'block',
      width: 300
    }
  },
  'LayoutFooter-root': {},
  'LayoutFooter-sectionList': {},
  'LayoutFooter-sectionBottom': {},
  heading: {
    // fontFamily:
    //   '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: 800
  },
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%',
      height: '100%',
      objectFit: 'scale-down'
    })
  }
}));

const useStylesHeader = makeStyles(() => ({
  'SectionItem-root': {
    display: 'flex',
    alignItems: 'center'
  },
  'SiteTitle-link': {
    opacity: 1,
    '&:hover': { textDecorationLine: 'none', opacity: 1 }
  },
  'SiteLogo-link': {
    opacity: 1,
    '&:hover': { textDecorationLine: 'none', opacity: 1 }
  }
}));
const useStylesGrid = makeStyles(() => ({
  'SectionList-root': {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)'
    // gridGap: theme.spacing(3)
  },
  'SectionItem-root': {
    gridColumnEnd: 'span 6'
  }
}));
const useStyleSidePersistSections = makeStyles((theme) => ({
  'SectionItem-root': {
    display: 'block',
    maxWidth: theme.breakpoints.values.sm
  }
}));
const useStyleSideSections = makeStyles((theme) => ({
  'SectionItem-root': {
    [theme.breakpoints.up('md')]: {
      display: 'block'
    },
    display: 'none'
  }
}));
const classNames = [
  'LayoutHeader-root',
  'LayoutHeader-sectionTop',
  'LayoutHeader-sectionList',
  'LayoutContaienr-root',
  'LayoutContaienr-body',
  'LayoutContaienrTop-sectionList',
  'LayoutContaienrBottom-sectionList',
  'LayoutContaienrTop-persistSectionList',
  'LayoutContaienrBottom-persistSectionList',
  'LayoutContaienrTop-sectionList-inner',
  'LayoutContaienrBottom-sectionList-inner',
  'LayoutFooter-root',
  'LayoutFooter-sectionList',
  'LayoutFooter-sectionBottom',
  'pageMain',
  'SectionItem-root',
  'SiteTitle-link',
  'SiteLogo-link',
  'SectionList-root',
  'SectionItem-root'
];

const sectionConfigInPosts = mergeSectionConfig({
  naked: true
});
const sectionConfigInLayout = mergeSectionConfig({
  naked: true,
  component: { sectionComponent: 'div' } // section ????????????????????????????????????
});

type Props = {
  children?: ReactNode;
  title?: string;
  pageData: PageData;
  home?: boolean;
  classes?: { [key: string]: string };
};

const Layout = ({
  children,
  title = '',
  pageData,
  home,
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const classesHeaderFooter = useStylesGrid({
    classes: pruneClasses(inClasses, classNames)
  });
  const classesHeader = useStylesHeader({
    classes: pruneClasses(inClasses, classNames)
  });
  const classesSidePersistSections = useStyleSidePersistSections({
    classes: pruneClasses(inClasses, classNames)
  });
  const classesSideSections = useStyleSideSections({
    classes: pruneClasses(inClasses, classNames)
  });
  const { siteTitle } = useContext(siteContext).labels;
  const headerSectionsLen = pageData.header.length;
  const topPersistSections = pageData.top.filter(({ persist }) => persist);
  const topPersistSectionsLen = topPersistSections.length;
  const topSections = pageData.top.filter(({ persist }) => !persist);
  const topSectionsLen = topSections.length;
  const sectionsLen = pageData.sections.length;
  const bottomPersistSections = pageData.bottom.filter(
    ({ persist }) => persist
  );
  const bottomPersistSectionsLen = bottomPersistSections.length;
  const bottomSections = pageData.bottom.filter(({ persist }) => !persist);
  const bottomSectionsLen = bottomSections.length;
  const footerSectionsLen = pageData.footer.length;
  const maxWidth = 'sm';
  return (
    <>
      <Head>
        <title>{`${title}: ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={classes['LayoutHeader-root']}>
        <Container maxWidth={maxWidth} disableGutters>
          <Box className={classes['LayoutHeader-sectionTop']}>
            <SectionList
              sections={[
                {
                  title: '',
                  content: [
                    { kind: 'partsSiteLogo', size: 'small', link: '/' },
                    { kind: 'partsSiteTitle', link: '/' }
                  ]
                },
                {
                  title: '',
                  content: [{ kind: 'partsNavMain' }]
                }
              ]}
              config={sectionConfigInLayout}
              classes={{ ...classesHeader }}
            />
            {home && (
              <SectionList
                sections={[
                  {
                    title: '',
                    content: [
                      {
                        kind: 'partsProfileImage',
                        size: '',
                        name: true,
                        link: ''
                      }
                    ]
                  }
                ]}
                config={sectionConfigInLayout}
                classes={{ ...classesHeader }}
              />
            )}
          </Box>
          {headerSectionsLen > 0 && (
            <>
              <Box className={classes['LayoutHeader-sectionTop']}>
                <SectionList
                  sections={pageData.header.slice(0, 1)}
                  config={sectionConfigInLayout}
                  classes={{ ...classes }}
                />
              </Box>
              <Box className={classes['LayoutHeader-sectionList']}>
                <SectionList
                  sections={pageData.header.slice(1)}
                  config={sectionConfigInLayout}
                  classes={{ ...classesHeaderFooter }}
                />
              </Box>
            </>
          )}
        </Container>
      </header>
      <Box className={classes['LayoutContaienr-root']}>
        <Box className={classes['LayoutContaienrTop-sectionList-inner']}>
          {topPersistSectionsLen > 0 && (
            <SectionList
              sections={topPersistSections}
              classes={classesSidePersistSections}
            />
          )}
          {topSectionsLen > 0 && (
            <SectionList sections={topSections} classes={classesSideSections} />
          )}
        </Box>
        <Container className={classes['LayoutContaienr-body']} disableGutters>
          {sectionsLen > 0 && (
            <>
              <SectionItem
                data={{
                  title: '',
                  content: [
                    {
                      kind: 'partsNavBreadcrumbs',
                      lastBreadcrumb: pageData.title
                    }
                  ]
                }}
              />
              <SectionList
                sections={[
                  {
                    title: '',
                    content: [
                      {
                        kind: 'partsPageTitle',
                        link: ''
                      },
                      {
                        kind: 'partsUpdated'
                      }
                    ]
                  }
                ]}
                config={sectionConfigInPosts}
              />
              <Box component="article" className={classes.pageMain}>
                <SectionList
                  sections={pageData.sections}
                  config={sectionConfigInPosts}
                  classes={{ ...classes }}
                />
              </Box>
            </>
          )}
          <>{children}</>
        </Container>
        <Box className={classes['LayoutContaienrBottom-sectionList-inner']}>
          {bottomPersistSectionsLen > 0 && (
            <SectionList
              sections={bottomPersistSections}
              classes={classesSidePersistSections}
            />
          )}
          {bottomSectionsLen > 0 && (
            <SectionList
              sections={bottomSections}
              classes={classesSideSections}
            />
          )}
        </Box>
      </Box>
      <footer className={classes['LayoutHeader-root']}>
        {footerSectionsLen > 0 && (
          <Container maxWidth={maxWidth} disableGutters>
            <Box className={classes['LayoutFooter-sectionList']}>
              <SectionList
                sections={pageData.footer.slice(0, footerSectionsLen - 1)}
                config={sectionConfigInLayout}
                classes={{ ...classesHeaderFooter }}
              />
            </Box>
            <Box className={classes['LayoutFooter-sectionBottom']}>
              <SectionList
                sections={pageData.footer.slice(-1)}
                config={sectionConfigInLayout}
                classes={{ ...classes }}
              />
            </Box>
          </Container>
        )}
      </footer>
    </>
  );
};

export default Layout;
