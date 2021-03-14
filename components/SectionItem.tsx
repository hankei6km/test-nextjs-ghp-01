import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';
import SectionContext from './SectionContext';
import SectionContent from './SectionContent';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {},
  'SectionItem-contentBody': {},
  'SectionItem-contentArticles': {}
}));
const classNames = [
  'SectionItem-root',
  'SectionItem-title',
  'SectionItem-contentBody',
  'SectionItem-contentArticles'
];

export type SectionItemComponent = {
  sectionComponent: ElementType<any>;
  sectionTitleComponent: ElementType<any>;
};

export type SectionItemVariant = {
  sectionTitleVariant: TypographyProps['variant'];
};

type Props = {
  data: SectionType;
  classes?: { [key: string]: string };
};

const SectionItem = ({ data, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { naked, component, variant } = useContext(SectionContext);
  const itemNode = (
    <>
      {data.title && (
        <Typography
          variant={variant.sectionTitleVariant}
          component={component.sectionTitleComponent}
          className={classes['SectionItem-title']}
          id={data.id}
        >
          {data.title}
        </Typography>
      )}
      {data.content.map((content, i) => (
        <SectionContent
          key={`${i}-${content.kind}`}
          content={content}
          classes={{ ...inClasses }}
        />
      ))}
    </>
  );
  if (naked) {
    return itemNode;
  }
  return (
    <Box
      component={component.sectionComponent}
      className={classes['SectionItem-root']}
    >
      {itemNode}
    </Box>
  );
};
export default SectionItem;
