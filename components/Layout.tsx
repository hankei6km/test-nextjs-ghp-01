import React, { useContext, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
// import Image from 'next/image';
import Link from './Link';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import siteContext from '../components/SiteContext';

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

const Layout = ({ children, title = '', home = false }: Props) => {
  const classes = useStyles();
  const { siteTitle, profile } = useContext(siteContext);
  const maxWidth = 'sm';
  return (
    <div>
      <Head>
        <title>{`${title}: ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar
        position="sticky"
        style={{ top: home ? -300 : -300 }}
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Container maxWidth={maxWidth} disableGutters>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
            >
              {home ? (
                <>
                  <Box>
                    <Typography component="h1" variant="h5">
                      {siteTitle}
                    </Typography>
                  </Box>
                  <Box>
                    <img
                      // img を使うと
                      // "Warning: Expected server HTML to contain a matching <img> in <div>." となる.
                      // window.devicePixelRatio が 1 だとならない(と思う).
                      // next/image を使うとならない.
                      src={profile.image}
                      className={classes.headerHomeImage}
                      width={130}
                      height={130}
                      alt={profile.name}
                    />
                  </Box>
                  <Box>
                    <Typography className={classes.heading} variant="h3">
                      {profile.name}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Link href="/">
                      <img
                        src={profile.image}
                        className={classes.headerImage}
                        width={110}
                        height={110}
                        alt={profile.name}
                      />
                    </Link>
                  </Box>
                  <Box>
                    <Typography
                      component={Link}
                      className={classes.heading}
                      color="textPrimary"
                      underline="none"
                      variant="h4"
                      href="/"
                    >
                      {profile.name}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={0}
              style={{ position: 'sticky', top: 0 }}
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
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth={maxWidth} disableGutters>
        <Box>{children}</Box>
      </Container>
      <footer>
        <Container maxWidth={maxWidth} disableGutters>
          <Box m={2}>
            <span>I'm here to stay (Footer)</span>
          </Box>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
