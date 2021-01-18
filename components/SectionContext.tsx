import React from 'react';
import { ArticleListComponent, ArticleListVariant } from './ArticleList';
import { SectionItemComponent, SectionItemVariant } from './SectionItem';
import { ArticleDetailComponent, ArticleDetailVariant } from './ArticleDetail';
import { ArticleItemComponent, ArticleItemVariant } from './ArticleItem';

export type SectionConfig = {
  component: SectionItemComponent &
    ArticleListComponent &
    ArticleDetailComponent &
    ArticleItemComponent;
  variant: SectionItemVariant &
    ArticleListVariant &
    ArticleDetailVariant &
    ArticleItemVariant;
};
export const sectionContextDefault: SectionConfig = {
  component: {
    sectionTitleComponent: 'h2',
    articleDetailComponent: 'article',
    articleItemComponent: 'li',
    articleDetailTitleComponent: 'h3',
    articleItemTitleComponent: 'span'
  },
  variant: {
    sectionTitleVariant: 'h2',
    articleDetailTitleVariant: 'h3',
    articleItemTitleVariant: 'body1'
  }
};

const SectionContext = React.createContext(sectionContextDefault);
export default SectionContext;
