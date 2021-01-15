const siteConfig = {
  siteTitle:
    process.env.SITE_TITLE || 'My Starter: Next.js x Material-UI x microCMS',
  profile: {
    name: process.env.PROFILE_NAME || 'my-starter',
    image:
      process.env.PROFILE_IMAGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png'
  }
};

export default siteConfig;
