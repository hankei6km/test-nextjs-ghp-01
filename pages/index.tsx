import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import SectionList from '../components/SectionList';
import { PageData } from '../types/pageTypes';
import { getPagesPageData } from '../lib/pages';

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
    <Layout home title={pageData.title}>
      <Box my={1}>
        <SectionList sections={pageData.sections} classes={{ ...classes }} />
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPagesPageData('pages',{ params: { id: 'home' } });
  return {
    props: {
      pageData
    }
  };
};
