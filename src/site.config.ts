const siteConfig: {
  label: { [key: string]: string };
  image: { [key: string]: string };
} = {
  label: {
    // contentConfig として参照される値.
    // pages api の入力によってページ上にラベルとして表示されるので注意.
    siteTitle: process.env.SITE_TITLE || 'My Starter',
    profileName: process.env.PROFILE_NAME || 'starter'
  },
  image: {
    // contentConfig として参照される値.
    // pages api の入力によってページ上に画像として表示されるので注意.
    profileImage:
      process.env.PROFILE_IMAGE ||
      'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-profile1.png'
  }
};

export default siteConfig;
