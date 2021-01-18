import { ElementType } from 'react';
import { SectionConfig } from '../components/SectionContext';
import { TypographyProps } from '@material-ui/core/Typography';

const siteConfig: {
  sectionConfig: SectionConfig & {
    component: {
      'configLabel-siteTitle-Component': ElementType<any>;
      'configLabel-profileName-Component': ElementType<any>;
    };
    variant: {
      'configLabel-siteTitle-Variant': TypographyProps['variant'];
      'configLabel-profileName-Variant': TypographyProps['variant'];
    };
  };
  label: { [key: string]: string };
  image: { [key: string]: string };
} = {
  sectionConfig: {
    component: {
      'configLabel-siteTitle-Component': 'h1',
      'configLabel-profileName-Component': 'span',
      sectionTitleComponent: 'h2',
      articleDetailComponent: 'article',
      articleItemComponent: 'li',
      articleDetailTitleComponent: 'h3',
      articleItemTitleComponent: 'span',
      siteTitleComponent: 'h1',
      pageTitleComponent: 'h2'
    },
    variant: {
      'configLabel-siteTitle-Variant': 'h2',
      'configLabel-profileName-Variant': 'body1',
      sectionTitleVariant: 'h2',
      articleDetailTitleVariant: 'h3',
      articleItemTitleVariant: 'body1',
      siteTitleVariant: 'h2',
      pageTitleVariant: 'h2'
    }
  },
  label: {
    // contentConfig として参照される値.
    // pages api の入力によってページ上にラベルとして表示されるので注意.
    siteTitle: process.env.SITE_TITLE || 'My Starter',
    profileName: process.env.PROFILE_NAME || 'starter'
  },
  image: {
    // contentConfig として参照される値.
    // pages api の入力によってページ上に画像として表示されるので注意.
    profileImageLarge:
      process.env.PROFILE_IMAGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png?w=240&h=240',
    profileImage:
      process.env.PROFILE_IMAGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png?w=140&h=140',
    profileImageSmall:
      process.env.PROFILE_IMAGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png?w=80&h=80'
  }
};

export default siteConfig;
