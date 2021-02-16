import { TextlintKernelRule } from '@textlint/kernel';
import { TextlintKernelOptions } from '@textlint/kernel/lib/textlint-kernel-interface';

export type Presets = {
  // preset のモジュール名から prefix を取り除いたもの.
  // ie: 'textlint-rule-preset-ja-technical-writing' -> 'ja-technical-writing'
  // ただし全く異なる値を設定してもエラーとはならないので注意.
  presetId: string;
  // モジュールを reuire で取り込んだもの. 必ず **バンドルされるよう**に定義すること.
  preset: any;
}[];
// Preset の rule には 'presetId/ruleId' となるように指定する.
export type RuleOptions = { [key: string]: TextlintKernelRule['options'] };

// https://github.com/mobilusoss/textlint-browser-runner/tree/master/packages/textlint-bundler
export function getTextlintKernelOptions(
  presets?: Presets,
  rules?: TextlintKernelRule,
  ruleOptions?: RuleOptions
): TextlintKernelOptions {
  // preset の ruleId の扱い.
  // `${presetRuleNameWithoutPrefix}/${ruleId}`
  // '/' については RuleSeparator で定義されているが export されてない.
  // というか使ってはダメなのか?
  // >  * Main purpose hide the RuleSeparator "/".
  // https://github.com/textlint/textlint/blob/be0b48c1a83713ee7b649447d7580c42ffca9ace/packages/textlint/src/engine/textlint-module-loader.ts#L135
  // https://github.com/textlint/textlint/blob/be0b48c1a83713ee7b649447d7580c42ffca9ace/packages/textlint/src/engine/textlint-module-mapper.ts#L20
  // https://github.com/textlint/textlint/issues/299
  // preset を複数扱う場合にはどこからエラーが発生したのか識別できるように
  // ruleId は上記に則って付与する。ただし手動とする。
  const _presets = presets || [
    {
      presetId: 'japanese',
      preset: require('textlint-rule-preset-japanese')
    },
    {
      presetId: 'ja-technical-writing',
      preset: require('textlint-rule-preset-ja-technical-writing')
    }
  ];
  const _rules = rules || [];
  // ruleOptions の  key は preset のrule のoption を指定すｒ場合は
  // 'japanese-???' のように指定する.
  const _ruleOptions = ruleOptions || {};
  const options = {
    // filePath: '/path/to/file.md',
    ext: '.html',
    plugins: [
      {
        pluginId: 'html',
        plugin: require('textlint-plugin-html')
      }
    ],
    rules: _presets
      .map((p) =>
        Object.entries(p.preset.rules).map<TextlintKernelRule>(([k, v]) => {
          const ruleId = `${p.presetId}/${k}`;
          return {
            ruleId: ruleId,
            rule: v as TextlintKernelRule['rule'],
            options:
              _ruleOptions[ruleId] !== undefined
                ? _ruleOptions[ruleId]
                : p.preset.rulesConfig[k] !== undefined
                ? p.preset.rulesConfig[k]
                : {}
          };
        })
      )
      .reduce((a, v) => a.concat(v), [])
      .concat(_rules)
    // .flat(1)
    //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  };

  return options;
}
