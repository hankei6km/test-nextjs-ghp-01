import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SectionItem from './SectionItem';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';

const useStyles = makeStyles(() => ({
  'SectionList-root': {}
}));
// 上記の設定と手動であわせる.
// 自動化できない?
const classNames = ['SectionList-root', 'Section-item'];

type Props = {
  sections: SectionType[];
  classes?: { [key: string]: string };
};

const SectionList = ({ sections, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  return (
    <Box className={classes['SectionList-root']}>
      {sections.map((section, i) => (
        <SectionItem
          key={i}
          data={section}
          classes={{ ...inClasses } /* 'Section-*' は除外する?  */}
        />
      ))}
    </Box>
  );
};

export default SectionList;
