import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import Box from '@material-ui/core/Box';
import { PageData } from '../../../types/pageTypes';
import {
  getPagesPageData,
  getPagesData,
  getAllCategolizedPaginationIds
} from '../../../lib/pages';
import SectionList from '../../../components/SectionList';
import PageContext from '../../../components/PageContext';
// import classes from '*.module.css';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Post({
  pageData
}: {
  pageData: PageData;
  preview: boolean;
}) {
  const classes = useStyles();
  if (!pageData) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageContext.Provider value={pageData}>
      <Layout
        headerSections={pageData.header}
        title={pageData.title}
        footerSections={pageData.footer}
      >
        <Box my={1}>
          <SectionList
            sections={[
              {
                title: '',
                content: [
                  {
                    kind: 'partsNavCategory',
                    all: true,
                    categoryPath: '/posts/category'
                  },
                  {
                    kind: 'partsPageTitle',
                    link: ''
                  }
                ]
              }
            ]}
            classes={{ ...classes }}
          />
          <SectionList sections={pageData.top} classes={{ ...classes }} />
          <SectionList sections={pageData.sections} classes={{ ...classes }} />
          <SectionList sections={pageData.bottom} classes={{ ...classes }} />
        </Box>
        <Link href="/posts">{'Back to posts'}</Link>
      </Layout>
    </PageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const category = (
    await getPagesData('pages', {
      params: { id: 'blog-category' }
    })
  ).category.map(({ id }) => id);
  const paths = (
    await getAllCategolizedPaginationIds('posts', category, 10)
  ).map((id) => ({
    params: { id: id }
  }));
  // console.log('paths');
  // paths.forEach((p) => console.log(p.params));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id || [''];
  const pageNo = id.length > 1 ? parseInt(id[1], 10) : 1;
  const pageData = await getPagesPageData(
    'category',
    { ...context, params: { id: id[0] } },
    {
      outerIds: ['blog-category'],
      mapApiNameArticle: { articles: 'posts' as const },
      itemsPerPage: 10,
      pageNo
    }
  );
  return {
    props: {
      pageData,
      preview: context.preview ? context.preview : null
    }
  };
};
