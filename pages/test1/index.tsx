import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import Layout from '../../components/Layout';
import List from '../../components/List';
import { PostsContent } from '../../types/client/contentTypes';

const PostsPage = ({ allPostsData }: { allPostsData: PostsContent[] }) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <List items={allPostsData} />
    </Layout>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData('test1');
  return {
    props: {
      allPostsData
    }
  };
};
