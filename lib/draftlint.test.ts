import { insertHtmlToSections, textLintInSections } from './draftlint';
import { getTextlintKernelOptions } from '../utils/textlint';

describe('insertHtmlToSections()', () => {
  it('should insert html to sections', () => {
    expect(
      insertHtmlToSections('<span>ins1</span>', 16, [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            }
          ]
        }
      ])
    ).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test1'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 't<span>ins1</span>est2'
              }
            ]
          }
        ]
      }
    ]);
    expect(
      insertHtmlToSections('<span>ins1</span>', 3, [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            }
          ]
        }
      ])
    ).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: '<span>ins1</span>test1'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test2'
              }
            ]
          }
        ]
      }
    ]);
    expect(
      insertHtmlToSections('<span>ins1</span>', 8, [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            }
          ]
        }
      ])
    ).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test1<span>ins1</span>'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test2'
              }
            ]
          }
        ]
      }
    ]);
    expect(
      insertHtmlToSections('<span>ins1</span>', 31, [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            },
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'div',
                  style: {},
                  attribs: {},
                  html: 'test3'
                },
                {
                  tagName: 'div',
                  style: {},
                  attribs: {},
                  html: 'test4'
                }
              ]
            }
          ]
        }
      ])
    ).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test1'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test2'
              }
            ]
          },
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'div',
                style: {},
                attribs: {},
                html: 'te<span>ins1</span>st3'
              },
              {
                tagName: 'div',
                style: {},
                attribs: {},
                html: 'test4'
              }
            ]
          }
        ]
      }
    ]);
  });
  it('should adjust insert position', () => {
    expect(
      insertHtmlToSections('<span>ins1</span>', 2, [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            }
          ]
        }
      ])
    ).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: '<span>ins1</span>test1'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test2'
              }
            ]
          }
        ]
      }
    ]);
    expect(
      insertHtmlToSections('<span>ins1</span>', 9, [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            }
          ]
        }
      ])
    ).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test1<span>ins1</span>'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test2'
              }
            ]
          }
        ]
      }
    ]);
  });
});

describe('textLintInSections()', () => {
  const presets = getTextlintKernelOptions({
    presets: [
      { presetId: 'japanese', preset: require('textlint-rule-preset-japanese') }
    ]
  });
  it('should lints html that contained sections', async () => {
    const res = await textLintInSections(
      [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: '今日は、おいしい、ものが、食べれた。'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'テストが成功するとこが確認できた。'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: '食べれた&amp;文字参照が確認が出来た。'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'test2'
                }
              ]
            }
          ]
        }
      ],
      presets
    );
    expect(res.sections).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test1'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html:
                  // attr の並びはは保障されていないはず
                  '今日は、おいしい、ものが、<span style="color: red;" id=":textLintMessage:0">一つの文で"、"を3つ以上使用しています</span>食べれ<span style="color: red;" id=":textLintMessage:1">ら抜き言葉を使用しています。</span>た。'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html:
                  'テストが成功するとこが<span style="color: red;" id=":textLintMessage:2">一文に二回以上利用されている助詞 "が" がみつかりました。</span>確認できた。'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html:
                  '<span style="color: red;" id=":textLintMessage:3">一文に二回以上利用されている助詞 "が" がみつかりました。</span>食べれ<span style="color: red;" id=":textLintMessage:4">ら抜き言葉を使用しています。</span>た&amp;文字参照が確認が出来た。'
              },
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'test2'
              }
            ]
          }
        ]
      }
    ]);
    expect(res.messages).toStrictEqual([
      {
        ruleId: 'japanese/max-ten',
        id: ':textLintMessage:0',
        severity: 2,
        message: '一つの文で"、"を3つ以上使用しています'
      },
      {
        ruleId: 'japanese/no-dropping-the-ra',
        id: ':textLintMessage:1',
        severity: 2,
        message: 'ら抜き言葉を使用しています。'
      },
      {
        ruleId: 'japanese/no-doubled-joshi',
        id: ':textLintMessage:2',
        severity: 2,
        message: '一文に二回以上利用されている助詞 "が" がみつかりました。'
      },
      {
        ruleId: 'japanese/no-doubled-joshi',
        id: ':textLintMessage:3',
        severity: 2,
        message: '一文に二回以上利用されている助詞 "が" がみつかりました。'
      },
      {
        ruleId: 'japanese/no-dropping-the-ra',
        id: ':textLintMessage:4',
        severity: 2,
        message: 'ら抜き言葉を使用しています。'
      }
    ]);
    expect(res.list).toEqual(
      '<dl><dt>error</dt><dd><a href="#:textLintMessage:0">一つの文で"、"を3つ以上使用しています(japanese/max-ten)</a></dd><dt>error</dt><dd><a href="#:textLintMessage:1">ら抜き言葉を使用しています。(japanese/no-dropping-the-ra)</a></dd><dt>error</dt><dd><a href="#:textLintMessage:2">一文に二回以上利用されている助詞 "が" がみつかりました。(japanese/no-doubled-joshi)</a></dd><dt>error</dt><dd><a href="#:textLintMessage:3">一文に二回以上利用されている助詞 "が" がみつかりました。(japanese/no-doubled-joshi)</a></dd><dt>error</dt><dd><a href="#:textLintMessage:4">ら抜き言葉を使用しています。(japanese/no-dropping-the-ra)</a></dd></dl>'
    );
  });
  it('should apply style to messages', async () => {
    const res = await textLintInSections(
      [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'テストが成功するとこが確認できた。'
                }
              ]
            }
          ]
        }
      ],
      presets,
      {
        'background-color': '#ff0000'
      }
    );
    expect(res.sections).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html:
                  'テストが成功するとこが<span style="background-color: #ff0000;" id=":textLintMessage:0">一文に二回以上利用されている助詞 "が" がみつかりました。</span>確認できた。'
              }
            ]
          }
        ]
      }
    ]);
    expect(res.messages).toStrictEqual([
      {
        ruleId: 'japanese/no-doubled-joshi',
        id: ':textLintMessage:0',
        severity: 2,
        message: '一文に二回以上利用されている助詞 "が" がみつかりました。'
      }
    ]);
  });
  it('should inserts no messages', async () => {
    const res = await textLintInSections(
      [
        {
          title: '',
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'テストが成功するところを確認できた。'
                }
              ]
            }
          ]
        }
      ],
      presets
    );
    expect(res.sections).toStrictEqual([
      {
        title: '',
        content: [
          {
            kind: 'html' as const,
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'テストが成功するところを確認できた。'
              }
            ]
          }
        ]
      }
    ]);
    expect(res.messages).toStrictEqual([]);
  });
});
