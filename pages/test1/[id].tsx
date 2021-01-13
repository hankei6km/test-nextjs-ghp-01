import { getAllArticleIds, getArticlePostData } from '../../lib/articles';
import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ArticlePost } from '../../types/articleTypes';

export default function Post({
  postData
}: {
  postData: ArticlePost;
  preview: boolean;
}) {
  if (!postData) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout title={postData.title}>
      <Box my={1}>
        <Card elevation={0}>
          <CardHeader
            titleTypographyProps={{ variant: 'h4' }}
            title={postData.title}
          />
          <CardContent>
            <Typography component={Box} variant="body1">
              {postData.content.map((data, i) =>
                data.kind === 'html' ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.html
                    }}
                    key={i}
                  />
                ) : (
                  ''
                )
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/posts">{'Back to posts'}</Link>
          </CardActions>
        </Card>
      </Box>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllArticleIds('test1');
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postData = await getArticlePostData('test1', context);
  return {
    props: {
      postData,
      preview: context.preview ? context.preview : null
    }
  };
};
