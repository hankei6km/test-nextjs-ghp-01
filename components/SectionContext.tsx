import React from 'react';
import { ArticleListComponent, ArticleListVariant } from './ArticleList';
import { SectionItemComponent, SectionItemVariant } from './SectionItem';
import { ArticleDetailComponent, ArticleDetailVariant } from './ArticleDetail';
import { ArticleItemComponent, ArticleItemVariant } from './ArticleItem';

type Context = {
  component: SectionItemComponent &
    ArticleListComponent &
    ArticleDetailComponent &
    ArticleItemComponent;
  variant: SectionItemVariant &
    ArticleListVariant &
    ArticleDetailVariant &
    ArticleItemVariant;
};
export const sectionContextDefault: Context = {
  component: {
    articleDetailComponent: 'article',
    articleItemComponent: 'li',
    contentTitleComponent: 'h2',
    articlesTitleDetailComponent: 'h2',
    articlesTitleComponent: 'h2',
    articleDetailTitleComponent: 'h3',
    articleItemTitleComponent: 'span'
  },
  variant: {
    contentTitleVariant: 'h2',
    articlesTitleDetailVariant: 'h2',
    articlesTitleVariant: 'h2',
    articleDetailTitleVariant: 'h3',
    articleItemTitleVariant: 'body1'
  }
};

const SectionContext = React.createContext(sectionContextDefault);
export default SectionContext;
