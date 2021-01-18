import React from 'react';
import { ArticleListComponent, ArticleListVariant } from './ArticleList';
import { SectionItemComponent, SectionItemVariant } from './SectionItem';
import { ArticleDetailComponent, ArticleDetailVariant } from './ArticleDetail';
import { ArticleItemComponent, ArticleItemVariant } from './ArticleItem';
import { SiteTitleComponent, SiteTitleVariant } from './parts/SiteTitle';
import { PageTitleComponent, PageTitleVariant } from './parts/PageTitle';

export type SectionConfig = {
  component: SectionItemComponent &
    ArticleListComponent &
    ArticleDetailComponent &
    ArticleItemComponent &
    SiteTitleComponent &
    PageTitleComponent;
  variant: SectionItemVariant &
    ArticleListVariant &
    ArticleDetailVariant &
    ArticleItemVariant &
    SiteTitleVariant &
    PageTitleVariant;
};
export const sectionContextDefault: SectionConfig = {
  component: {
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
};

const SectionContext = React.createContext(sectionContextDefault);
export default SectionContext;
