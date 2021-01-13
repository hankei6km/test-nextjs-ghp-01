import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../../components/Layout';
import SectionList from '../../components/SectionList';
import { Section as SectionType } from '../../types/pageTypes';
import { getPagesSectionsData } from '../../lib/pages';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

type PageData = {
  sections: SectionType[];
};

const PostsPage = ({ pageData }: { pageData: PageData }) => {
  const classes = useStyles();
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Box my={1}>
        <SectionList sections={pageData.sections} classes={{ ...classes }} />
      </Box>
    </Layout>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  // const sections = (await getPagesData({ params: { id: 'test1' } })).sections;
  const pageData: PageData = {
    sections: await getPagesSectionsData({ params: { id: 'test1' } })
    // sections: [
    //   {
    //     title: 'test1 posts',
    //     kind: 'posts',
    //     contents: await getSortedArticleList('test1'),
    //     detail: true
    //   }
    // ]
  };
  return {
    props: {
      pageData
    }
  };
};
