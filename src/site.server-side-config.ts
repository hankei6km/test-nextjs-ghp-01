// サーバー側で使う設定.
// ブラウザでは使わない or 見せたくない項目(セキュリティ的にの他にサイズ的な等

const siteServerSideConfig: {
  imageConfig: {
    contentImageClassName: string;
  };
} = {
  imageConfig: {
    // siteConfig と重複している項目
    contentImageClassName: 'contentImage-root'
  }
};
export default siteServerSideConfig;
