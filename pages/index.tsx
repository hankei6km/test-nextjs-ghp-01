import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import SectionList from '../components/SectionList';
import { PageData, Section } from '../types/pageTypes';
import { getPagesPageData } from '../lib/pages';
import siteConfig from '../src/site.config';
import { wrapStyle } from '../utils/classes';
import PageContext from '../components/PageContext';

const useStyles = makeStyles(() => ({
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%',
      objectFit: 'scale-down'
    })
  }
}));

const IndexPage = ({ pageData }: { pageData: PageData }) => {
  const classes = useStyles();
  const proofileSection: Section[] = [
    {
      title: '',
      content: [{ kind: 'partsProfileImage', size: '', name: true, link: '' }]
    }
  ];
  return (
    <PageContext.Provider value={pageData}>
      <Layout
        home
        headerSections={proofileSection.concat(pageData.header)}
        title={pageData.title}
        footerSections={pageData.footer}
      >
        <Box my={1}>
          <SectionList sections={pageData.top} classes={{ ...classes }} />
          <Box className={classes.pageMain}>
            <SectionList
              sections={pageData.sections}
              classes={{ ...classes }}
            />
          </Box>
          <SectionList sections={pageData.bottom} classes={{ ...classes }} />
        </Box>
      </Layout>
    </PageContext.Provider>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPagesPageData('pages', { params: { id: 'home' } });
  return {
    props: {
      pageData
    }
  };
};
