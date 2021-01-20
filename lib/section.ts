import { join } from 'path';
import { getSortedPagesData } from './pages';
import { markdownToHtml } from './markdown';
import { ApiNameArticleValues, ApiNameArticle } from './client';
import { PagesContent, PagesSectionKind } from '../types/client/contentTypes';
import { Section } from '../types/pageTypes';

export async function getSectionFromPages(
  page: PagesContent,
  kind: PagesSectionKind
): Promise<Section[]> {
  const sections = page.sections
    .filter(({ fieldId }) => fieldId === kind)
    .map((section) => ({
      title: section.title || '',
      content: section.content.map((content) => {
        return async () => {
          if (content.fieldId === 'contentHtml') {
            return {
              kind: 'html' as const,
              contentHtml: content.html
            };
          } else if (content.fieldId === 'contentMarkdown') {
            return {
              kind: 'html' as const,
              contentHtml: markdownToHtml(content.markdown)
            };
          } else if (
            content.fieldId === 'contentArticles' &&
            ApiNameArticleValues.some((v) => v === content.apiName)
          ) {
            const contents = await getSortedPagesData(
              content.apiName as ApiNameArticle
            );
            return {
              kind: 'posts' as const,
              contents: contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', content.apiName)
              })),
              detail: content.detail || false
            };
          } else if (content.fieldId === 'contentImage') {
            return {
              kind: 'image' as const,
              image: content.image,
              alt: content.alt,
              link: content.link || ''
            };
          }
          return {
            kind: '' as const
          };
        };
      })
    }));
  // all だと fetch が同時に実行されすぎる?
  // (いっても 2 セクションもないだろうけど)
  return await Promise.all(
    sections.map(async (section) => {
      return {
        title: section.title,
        // content: []
        content: await Promise.all(section.content.map((content) => content()))
      };
    })
  );
}
