import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/Layout';
import List from '../components/List';
import { PostsContent } from '../types/client/contentTypes';

const IndexPage = ({ allPostsData }: { allPostsData: PostsContent[] }) => {
  return (
    <Layout home title="Home | Next.js + TypeScript Example">
      <List items={allPostsData} detail={false} />
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData('test1');
  return {
    props: {
      allPostsData
    }
  };
};
