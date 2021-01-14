import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../../components/Layout';
import SectionList from '../../components/SectionList';
import { PageData } from '../../types/pageTypes';
import { getPagesPageData } from '../../lib/pages';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const PostsPage = ({ pageData }: { pageData: PageData }) => {
  const classes = useStyles();
  return (
    <Layout title={pageData.title}>
      <Box my={1}>
        <SectionList sections={pageData.sections} classes={{ ...classes }} />
      </Box>
    </Layout>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPagesPageData({ params: { id: 'blog' } });
  return {
    props: {
      pageData
    }
  };
};
