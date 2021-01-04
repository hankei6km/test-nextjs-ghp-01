import React, { ReactNode } from 'react';
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

const name = 'my-starter';
const profileImage =
  'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png';

const Layout = ({
  children,
  title = 'This is the default title',
  home = false
}: Props) => {
  const classes = useStyles();
  const maxWidth = 'sm';
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar
        position="sticky"
        style={{ top: home ? -220 : -180 }}
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
                    <img
                      // img を使うと
                      // "Warning: Expected server HTML to contain a matching <img> in <div>." となる.
                      // window.devicePixelRatio が 1 だとならない(と思う).
                      // next/image を使うとならない.
                      src={profileImage}
                      className={classes.headerHomeImage}
                      width={130}
                      height={130}
                      alt={name}
                    />
                  </Box>
                  <Box>
                    <Typography className={classes.heading} variant="h3">
                      {name}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Link href="/">
                      <img
                        src={profileImage}
                        className={classes.headerImage}
                        width={110}
                        height={110}
                        alt={name}
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
                      {name}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Tabs indicatorColor="primary" textColor="primary" value={0}>
              <Tab label="Home" component={Link} href="/" />
              <Tab label="test1" component={Link} href="/test1" />
              <Tab label="About" component={Link} href="/about" />
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
