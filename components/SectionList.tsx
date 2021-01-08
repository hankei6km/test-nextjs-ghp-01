import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SectionItem, { SectionItemComponentVariant } from './SectionItem';
import { Section as SectionType } from '../types/pageTypes';

const useStyles = makeStyles(() => ({
  'Section-root': {
    width: '100%'
  },
  'Section-item': {
    width: '100%'
  }
}));

type Props = {
  sections: SectionType[];
  classes?: { [key: string]: string };
} & SectionItemComponentVariant;

const SectionList = ({
  sections,
  articleDetailComponent = 'article',
  articleItemComponent,
  contentTitleDetailVariant = 'h2',
  articlesTitleDetailVariant = 'h2',
  articlesTitleVariant = 'h2',
  contentTitleDetailComponent = 'h2',
  articlesTitleDetailComponent = 'h2',
  articlesTitleComponent = 'h2',
  articleDetailTitleVariant = 'h3',
  articleDetailTitleComponent = 'h3',
  articleItemTitleVariant = 'body1',
  articleItemTitleComponent = 'span',
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: inClasses });
  return (
    <Box className={classes['Section-root']}>
      {sections.map((section, i) => (
        <Box key={i} className={classes['Section-item']}>
          <SectionItem
            data={section}
            articleDetailComponent={articleDetailComponent}
            articleItemComponent={articleItemComponent}
            contentTitleDetailVariant={contentTitleDetailVariant}
            articlesTitleDetailVariant={articlesTitleDetailVariant}
            articlesTitleVariant={articlesTitleVariant}
            contentTitleDetailComponent={contentTitleDetailComponent}
            articlesTitleDetailComponent={articlesTitleDetailComponent}
            articlesTitleComponent={articlesTitleComponent}
            articleDetailTitleVariant={articleDetailTitleVariant}
            articleDetailTitleComponent={articleDetailTitleComponent}
            articleItemTitleVariant={articleItemTitleVariant}
            articleItemTitleComponent={articleItemTitleComponent}
            classes={{ ...inClasses } /* 'Section-*' は除外する?  */}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SectionList;
