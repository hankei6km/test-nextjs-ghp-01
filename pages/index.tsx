import { GetStaticProps } from 'next';
import { getSortedArticleList } from '../lib/articles';
import Layout from '../components/Layout';
import ArticleList from '../components/ArticleList';
import { ArticleContent } from '../types/client/contentTypes';

const IndexPage = ({ allPostsData }: { allPostsData: ArticleContent[] }) => {
  return (
    <Layout home title="Home | Next.js + TypeScript Example">
      <ArticleList items={allPostsData} detail={false} />
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedArticleList('test1');
  return {
    props: {
      allPostsData
    }
  };
};
