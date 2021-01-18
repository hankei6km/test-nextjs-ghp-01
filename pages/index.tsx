import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import SectionList from '../components/SectionList';
import { PageData } from '../types/pageTypes';
import { getPagesPageData } from '../lib/pages';
import PageContext from '../components/PageContext';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-articlesTitleDetail': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const IndexPage = ({ pageData }: { pageData: PageData }) => {
  const classes = useStyles();
  return (
    <PageContext.Provider value={pageData}>
      <Layout
        home
        headerSections={pageData.header}
        title={pageData.title}
        footerSections={pageData.footer}
      >
        <Box my={1}>
          <SectionList sections={pageData.top} classes={{ ...classes }} />
          <SectionList sections={pageData.sections} classes={{ ...classes }} />
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
