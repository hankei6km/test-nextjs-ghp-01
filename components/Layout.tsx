import React, { useContext, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
// import Image from 'next/image';
import Link from './Link';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import siteContext from '../components/SiteContext';
import { Section } from '../types/pageTypes';
import SectionList from './SectionList';

const useStyles = makeStyles({
  headerImage: {
    // width: '6rem',
    // height: '6rem',
    borderRadius: '9999px'
  },
  headerHomeImage: {
    // width: '8rem',
    // height: '8rem',
    borderRadius: '9999px'
  },
  heading: {
    // fontFamily:
    //   '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: 800
  }
});

type Props = {
  children?: ReactNode;
  title?: string;
  headerSections?: Section[];
  footerSections?: Section[];
  home?: boolean;
};

const tabs = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/posts'
  },
  {
    label: 'Abouit',
    href: '/about'
  }
];

const Layout = ({
  children,
  title = '',
  home = false,
  headerSections = [],
  footerSections = []
}: Props) => {
  const classes = useStyles();
  const { siteTitle } = useContext(siteContext).label;
  const maxWidth = 'sm';
  return (
    <>
      <Head>
        <title>{`${title}: ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Container maxWidth={maxWidth} disableGutters>
          <Typography component="h1" variant="h3">
            <Link href="/" underline="none">
              {siteTitle}
            </Link>
          </Typography>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={0}
            style={{ position: 'sticky', top: -1 }}
          >
            {tabs.map(({ label, href }) => (
              <Tab
                key={`${label}:${href}`}
                label={label}
                component={Link}
                href={href}
              />
            ))}
          </Tabs>
          {!home && (
            <Typography component="h2" variant="h3">
              {title}
            </Typography>
          )}
          <Box my={1}>
            <SectionList sections={headerSections} classes={{ ...classes }} />
          </Box>
        </Container>
      </header>
      <Container maxWidth={maxWidth} disableGutters>
        <Box>{children}</Box>
      </Container>
      <footer>
        <Container maxWidth={maxWidth} disableGutters>
          <Box my={1}>
            <SectionList sections={footerSections} classes={{ ...classes }} />
          </Box>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
