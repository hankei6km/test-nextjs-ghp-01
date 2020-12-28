import { GetStaticProps } from 'next';
import { getSortedTest1Data } from '../lib/test1';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { Test1Content } from '../api/contentTypes';

const IndexPage = ({ allPostsData }: { allPostsData: Test1Content[] }) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      {allPostsData.map(({ id, title }) => (
        <div key={title}>
          <Link href={`/test1/${id}`}>{title}</Link>
        </div>
      ))}
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
