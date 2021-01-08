import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../../components/Layout';
import SectionItem from '../../components/SectionItem';
import { Section as SectionType } from '../../types/pageTypes';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-titlePostsDetailOuter': {
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
        {pageData.sections.map((section, i) => (
          <Box key={i}>
            <SectionItem data={section} classes={{ ...classes }} />
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const pageData: PageData = {
    sections: [
      {
        title: 'test1 posts',
        kind: 'posts',
        contents: await getSortedPostsData('test1'),
        detail: true
      }
    ]
  };
  return {
    props: {
      pageData
    }
  };
};
