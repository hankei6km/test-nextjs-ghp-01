import React from 'react';
import { SectionContentHtmlChildren } from '../../types/pageTypes';

type Props = {
  htmlChildren: SectionContentHtmlChildren[];
};

const HtmlFragment = ({ htmlChildren }: Props) => {
  return (
    <>
      {htmlChildren.map((childItem, i) =>
        React.createElement(childItem.tagName, {
          style: childItem.style,
          ...childItem.attribs,
          key: `${childItem.tagName}-${i}`,
          dangerouslySetInnerHTML: childItem.html
            ? { __html: childItem.html }
            : undefined
        })
      )}
    </>
  );
};

export default HtmlFragment;
