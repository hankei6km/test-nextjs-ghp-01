import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import { PageData } from '../../types/pageTypes';
import { getAllPagesIds, getPagesPageData } from '../../lib/pages';
import SectionList from '../../components/SectionList';
import siteConfig from '../../src/site.config';
import { wrapStyle } from '../../utils/classes';
import PageContext from '../../components/PageContext';
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%',
      height: '100%',
      objectFit: 'scale-down'
    }),
    maxWidth: theme.breakpoints.values.sm,
    ...theme.typography.body1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& > h3': {
      ...theme.typography.h6,
      marginTop: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderLeft: `6px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.divider // ライトグレイぽい色は他にないかね
      // background: `linear-gradient(to right, ${theme.palette.primary.main} ,#f0f0f0)`
    },
    '& > h4': {
      ...theme.typography.h6,
      display: 'inline',
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      // color: theme.palette.primary.contrastText,
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const useSectionStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {}
}));

export default function Post({
  pageData
}: {
  pageData: PageData;
  preview: boolean;
}) {
  const classes = useStyles();
  const classesSection = useSectionStyles();
  if (!pageData) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageContext.Provider value={pageData}>
      <Layout
        title={pageData.title}
        pageData={{
          ...pageData,
          top: [
            {
              title: '目次のテスト',
              persist: true,
              content: [
                {
                  kind: 'partsNavContentToc',
                  expanded: false
                }
              ]
            },
            ...pageData.top
          ]
        }}
        classes={classes}
      >
        <SectionList
          sections={[
            {
              title: '',
              content: [
                {
                  kind: 'partsNavCategory',
                  all: false,
                  categoryPath: '/posts/category'
                }
              ]
            }
          ]}
          classes={{ ...classesSection }}
        />
        <Link href="/posts">{'Back to posts'}</Link>
      </Layout>
    </PageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getAllPagesIds('posts')).map((id) => ({
    params: { id }
  }));
  return {
    paths,
    fallback: process.env.USE_FALLBACK ? true : false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pageData = await getPagesPageData('posts', context, {
    outerIds: ['blog-posts']
  });
  return {
    props: {
      pageData,
      preview: context.preview ? context.preview : null
    }
  };
};
