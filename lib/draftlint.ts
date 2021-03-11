import cheerio from 'cheerio';
import { TextlintKernel } from '@textlint/kernel';
import { TextlintKernelOptions } from '@textlint/kernel/lib/textlint-kernel-interface';
import { Section } from '../types/pageTypes';
import { getIndexedHtml } from './html';
import { getTextlintKernelOptions } from '../utils/textlint';
import traverse from 'traverse';
const parseHtml = require('textlint-plugin-html/lib/html-to-ast').parse;

type InsInfo = {
  message: string;
  ruleId: string;
  severity: number;
  index: number;
  insIndex: number;
  range: [number, number];
};
type InsInfos = InsInfo[];

export function getInsInfos(html: string, messages: any[]): InsInfos {
  const ret: InsInfos = [];
  const nodes = traverse(parseHtml(html)).nodes();
  messages.forEach((m) => {
    let hit = -1;
    const index = m.index;
    nodes.forEach((node, ii) => {
      if (
        node.type &&
        node.range &&
        node.range[0] <= index &&
        index <= node.range[1]
      ) {
        hit = ii;
      }
    });
    if (hit >= 0) {
      const node = nodes[hit];
      const end = m.index - node.range[0];
      // console.log(end, node.value.slice(0, end), node.raw.slice(0, end));
      ret.push({
        message: m.message,
        ruleId: m.ruleId,
        severity: m.severity,
        index: m.index,
        // 末尾 ';' だと欠ける? よって先頭を使う
        // TODO: 末尾の扱いチェック(どこで欠ける?).
        insIndex:
          node.value &&
          node.raw &&
          node.value.slice(0, end) === node.raw.slice(0, end)
            ? m.index
            : node.range[0] - 1,
        range: [node.range[0] as number, node.range[1] as number]
      });
    }
  });
  return ret.sort((a, b) => a.insIndex - b.insIndex);
}

export function insertHtmlToSections(
  html: string,
  pos: number, // section を IndexedHtml の html に変換した場合の html の位置
  sections: Section[]
): Section[] {
  //  const ret = [...sections];
  const { index } = getIndexedHtml(sections);
  const idx = index.findIndex(
    ({ range }) => range[0] <= pos && pos <= range[1]
  );
  if (idx >= 0) {
    const { range, sectionIdx, contentIdx, childIdx } = index[idx];
    const content = sections[sectionIdx].content[contentIdx];
    if (content.kind === 'html') {
      const c = content.contentHtml[childIdx];
      let posInChild = pos - range[0] - (c.tagName.length + 2); // 2 = '<>'.length
      posInChild = posInChild < 0 ? 0 : posInChild;
      c.html = `${c.html.slice(0, posInChild)}${html}${c.html.slice(
        posInChild
      )}`;
    }
  } // 見つからないときは?
  return sections;
}
type TextLintInSectionsResult = {
  sections: Section[];
  messages: { ruleId: string; message: string; id: string; severity: number }[];
  list: string;
};

export async function textLintInSections(
  sections: Section[],
  options?: TextlintKernelOptions,
  messageStyle: { [key: string]: string } = { color: 'red' },
  idPrefix: string = ''
): Promise<TextLintInSectionsResult> {
  let ret: TextLintInSectionsResult = { sections, messages: [], list: '' };
  const indexedHtml = getIndexedHtml(sections);

  // https://github.com/mobilusoss/textlint-browser-runner/tree/master/packages/textlint-bundler
  const kernel = new TextlintKernel();

  const results = [
    await kernel.lintText(
      indexedHtml.html,
      // todo: options(presets など)は SiteServerSideConfig で定義できるようにする.
      options || getTextlintKernelOptions()
    )
  ];
  if (results && results.length > 0 && results[0].messages.length > 0) {
    const insInfos = getInsInfos(indexedHtml.html, results[0].messages);
    let slider = 0;
    const $wrapper = cheerio.load('<span/>')('span');
    Object.entries(messageStyle).forEach(([k, v]) => {
      $wrapper.css(k, v);
    });
    insInfos.forEach((m, i) => {
      const id = `${idPrefix}:textLintMessage:${i}`;
      $wrapper.attr('id', id);
      const html = $wrapper.html(m.message).parent().html();
      if (m.message && html) {
        const index = m.insIndex + 1;
        ret.sections = insertHtmlToSections(html, index + slider, ret.sections);
        slider = slider + html.length;
        ret.messages.push({
          ruleId: m.ruleId,
          message: m.message,
          id,
          severity: m.severity
        });
      }
    });
    const $dl = cheerio.load('<dl/>')('dl');
    ret.messages.forEach((m) => {
      const $d = cheerio.load('<dt></dt><dd><a/></dd>');
      // https://github.com/textlint/textlint/blob/master/packages/%40textlint/kernel/src/shared/rule-severity.ts
      // https://github.com/textlint/textlint/blob/master/packages/%40textlint/kernel/src/context/TextlintRuleSeverityLevelKeys.ts
      $d('dt').text(
        m.severity === 0 ? 'info' : m.severity === 1 ? 'warning' : 'error'
      );
      const $a = $d('a');
      $a.attr('href', `#${m.id}`);
      $a.text(`${m.message}(${m.ruleId})`);
      $dl.append($d('body').children());
    });
    ret.list = $dl.parent().html() || '';
  }
  return ret;
}
