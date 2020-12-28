import { Test1Content } from '../../api/common';
import { getAllTest1Ids, getTest1Data } from '../../lib/test1';
import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Post({
  postData
}: {
  postData: Test1Content;
  preview: boolean;
}) {
  if (!postData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={postData.title}>
      <Container max-width="sm">
        <Box py={1}>
          <Typography variant="h6">{postData.title}</Typography>
        </Box>
        <Box py={1}>
          <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: postData.contents }} />
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTest1Ids();
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postData = await getTest1Data(context);
  return {
    props: {
      postData,
      preview: context.preview ? context.preview : null
    }
  };
};
