import { GetStaticProps } from 'next';
import { getSortedTest1Data } from '../../lib/test1';
import Layout from '../../components/Layout';
import List from '../../components/List';
import { Test1Content } from '../../types/client/contentTypes';

const Test1Page = ({ allPostsData }: { allPostsData: Test1Content[] }) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <List items={allPostsData} />
    </Layout>
  );
};

export default Test1Page;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedTest1Data();
  return {
    props: {
      allPostsData
    }
  };
};
