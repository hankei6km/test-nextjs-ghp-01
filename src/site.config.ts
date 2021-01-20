import { SectionConfig } from '../components/SectionContext';

const siteConfig: {
  sectionConfig: SectionConfig;
  nav: { [key: string]: { label: string; href: string }[] };
  label: { [key: string]: string };
  image: { [key: string]: string };
} = {
  sectionConfig: {
    naked: false,
    component: {
      sectionComponent: 'section',
      sectionTitleComponent: 'h2',
      articleDetailComponent: 'article',
      articleItemComponent: 'li',
      articleDetailTitleComponent: 'h3',
      articleItemTitleComponent: 'span',
      siteTitleComponent: 'h1',
      pageTitleComponent: 'h2'
    },
    variant: {
      sectionTitleVariant: 'h2',
      articleDetailTitleVariant: 'h3',
      articleItemTitleVariant: 'body1',
      siteTitleVariant: 'h2',
      pageTitleVariant: 'h2'
    }
  },
  nav: {
    main: [
      {
        label: 'Home',
        href: '/'
      },
      {
        label: 'Blog',
        href: '/posts'
      },
      {
        label: 'About',
        href: '/about'
      }
    ]
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
    siteLogoLarge:
      process.env.SITE_LOGO_LARGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/my-starter-nextjs-mui-test01/media/my-starter-default-sitelogo1.png?w=140&h=140',
    siteLogo:
      process.env.SITE_LOGO ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/my-starter-nextjs-mui-test01/media/my-starter-default-sitelogo1.png?w=80&h=80',
    siteLogoSmall:
      process.env.SITE_LOGO_SMALL ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/my-starter-nextjs-mui-test01/media/my-starter-default-sitelogo1.png?w=50&h=50',
    profileImageLarge:
      process.env.PROFILE_IMAGE_LARGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png?w=240&h=240',
    profileImage:
      process.env.PROFILE_IMAGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png?w=140&h=140',
    profileImageSmall:
      process.env.PROFILE_IMAGE_SMALL ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png?w=80&h=80'
  }
};

export default siteConfig;
