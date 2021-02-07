import {
  ImageTemplate,
  imageMatcherLandscape,
  imageMatcherPortrait
} from '../lib/image';
// サーバー側で使う設定.
// ブラウザでは使わない or 見せたくない項目(セキュリティ的にの他にサイズ的な等

const siteServerSideConfig: {
  imageConfig: {
    contentImageClassName: string;
    template: ImageTemplate[];
  };
} = {
  imageConfig: {
    // siteConfig と重複している項目
    contentImageClassName: 'contentImage-img',
    template: [
      {
        matcher: (content) => imageMatcherLandscape(0)(content),
        template: `
        <picture>
          <source srcset="https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&#x26;fit64=Y3JvcA&#x26;h64=MzAw&#x26;w64=NTAw 3x, https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&#x26;fit64=Y3JvcA&#x26;h64=MzAw&#x26;w64=NTAw 2x, https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&#x26;fit64=Y3JvcA&#x26;h64=MzAw&#x26;w64=NTAw 1x" media="(min-width: 410px)">
          <img src="https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?fit64=Y3JvcA&#x26;h64=MzAw&#x26;w64=NTAw" alt="" width="500" height="300">
        </picture>
        `,
        asThumb: true,
        templateSrc: `{
          "imageBaseUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
          "baseParameterSet": [
            {}
          ],
          "baseMedias": [],
          "editTargetKey": "EDIT-TARGET-KEY",
          "defaultTargetKey": "DEFAULT-TARGET-KEY",
          "card": {
            "cardType": "summary_large_image",
            "title": "",
            "description": ""
          },
          "tagFragment": {
            "altText": "",
            "linkText": "",
            "asThumb": false,
            "newTab": false,
            "srcsetDescriptor": "auto",
            "disableWidthHeight": false
          },
          "previewSetState": "edited",
          "previewSetKind": "data",
          "previewSet": [
            {
              "itemKey": "ITEM-KEY-1",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "3"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 1500,
              "imgHeight": 900,
              "imgDispDensity": 3,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-2",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "2"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 1000,
              "imgHeight": 600,
              "imgDispDensity": 2,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-3",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "1"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 500,
              "imgHeight": 300,
              "imgDispDensity": 1,
              "media": "auto"
            },
            {
              "itemKey": "DEFAULT-TARGET-KEY",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 500,
              "imgHeight": 300,
              "imgDispDensity": 1,
              "media": "auto"
            }
          ]
        }`
      },
      {
        matcher: (content) => imageMatcherPortrait(0)(content),
        template: `
        <picture>
          <source srcset="https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&#x26;fit64=Y3JvcA&#x26;h64=NTAw&#x26;w64=MzAw 3x, https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&#x26;fit64=Y3JvcA&#x26;h64=NTAw&#x26;w64=MzAw 2x, https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&#x26;fit64=Y3JvcA&#x26;h64=NTAw&#x26;w64=MzAw 1x" media="(min-width: 240px)">
          <img src="https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?fit64=Y3JvcA&#x26;h64=NTAw&#x26;w64=MzAw" alt="" width="300" height="500">
        </picture>
        `,
        asThumb: true,
        templateSrc: `{
          "imageBaseUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
          "baseParameterSet": [
            {}
          ],
          "baseMedias": [],
          "editTargetKey": "EDIT-TARGET-KEY",
          "defaultTargetKey": "DEFAULT-TARGET-KEY",
          "card": {
            "cardType": "summary_large_image",
            "title": "",
            "description": ""
          },
          "tagFragment": {
            "altText": "",
            "linkText": "",
            "asThumb": false,
            "newTab": false,
            "srcsetDescriptor": "auto",
            "disableWidthHeight": false
          },
          "previewSetState": "edited",
          "previewSetKind": "data",
          "previewSet": [
            {
              "itemKey": "ITEM-KEY-1",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "3"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 900,
              "imgHeight": 1500,
              "imgDispDensity": 3,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-2",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "2"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 600,
              "imgHeight": 1000,
              "imgDispDensity": 2,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-3",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "1"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 300,
              "imgHeight": 500,
              "imgDispDensity": 1,
              "media": "auto"
            },
            {
              "itemKey": "DEFAULT-TARGET-KEY",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 300,
              "imgHeight": 500,
              "imgDispDensity": 1,
              "media": "auto"
            }
          ]
        }`
      }
    ]
  }
};
export default siteServerSideConfig;
