import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import SectionList from '../components/SectionList';
import { Section as SectionType } from '../types/pageTypes';
import { getPagesSectionsData } from '../lib/pages';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-articlesTitleDetail': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

type PageData = {
  sections: SectionType[];
};

const IndexPage = ({ pageData }: { pageData: PageData }) => {
  const classes = useStyles();
  return (
    <Layout home title="Home | Next.js + TypeScript Example">
      <Box my={1}>
        <SectionList sections={pageData.sections} classes={{ ...classes }} />
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const pageData: PageData = {
    sections: await getPagesSectionsData({ params: { id: 'home' } })
  };
  return {
    props: {
      pageData
    }
  };
};
