import { GetStaticProps } from 'next';
import { getSortedTest1Data } from '../lib/test1';
import Layout from '../components/Layout';
import List from '../components/List';
import { Test1Content } from '../types/client/contentTypes';

const IndexPage = ({ allPostsData }: { allPostsData: Test1Content[] }) => {
  return (
    <Layout home title="Home | Next.js + TypeScript Example">
      <List items={allPostsData} detail={false} />
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedTest1Data();
  return {
    props: {
      allPostsData
    }
  };
};
