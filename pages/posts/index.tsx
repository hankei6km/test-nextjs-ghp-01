import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../../components/Layout';
import SectionList from '../../components/SectionList';
import { PageData } from '../../types/pageTypes';
import { getPagesPageData, getAllPaginationIds } from '../../lib/pages';
import siteConfig from '../../src/site.config';
import { wrapStyle } from '../../utils/classes';
import PageContext from '../../components/PageContext';

const useStyles = makeStyles(() => ({
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%'
    })
  },
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const itemsPerPage = 10;
const pagePath: string[] = [];

const PostsPage = ({ pageData }: { pageData: PageData }) => {
  const classes = useStyles();
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
                    kind: 'partsNavBreadcrumbs',
                    lastBreadcrumb: ''
                  },
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
          <Box className={classes.pageMain}>
            <SectionList
              sections={pageData.sections}
              classes={{ ...classes }}
            />
          </Box>
          <SectionList sections={pageData.bottom} classes={{ ...classes }} />
          <SectionList
            sections={[
              {
                title: '',
                content: [
                  {
                    kind: 'partsNavPagination',
                    // section 側で展開した場合、取得できない情報が含まれている.
                    // コンテンツ側で parts 指定することにした場合扱えないので注意
                    href: '/posts/page/[..id]',
                    baseAs: '/posts/page',
                    pagePath: pagePath,
                    firstPageHref: '/posts'
                  }
                ]
              }
            ]}
            classes={{ ...classes }}
          />
        </Box>
      </Layout>
    </PageContext.Provider>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const id = 'blog';
  const pageNo = 1;
  const curCategory = '';
  const pageCount = (await getAllPaginationIds('posts', itemsPerPage)).length;
  const pageData = await getPagesPageData(
    'pages',
    { params: { id } },
    {
      outerIds: [],
      articlesApi: 'posts',
      curCategory,
      itemsPerPage,
      pageNo,
      pageCount
    }
  );
  return {
    props: {
      pageData
    }
  };
};
