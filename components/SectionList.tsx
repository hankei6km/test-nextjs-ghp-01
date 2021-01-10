import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SectionItem from './SectionItem';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';

const useStyles = makeStyles(() => ({
  'Section-root': {
    width: '100%'
  },
  'Section-item': {
    width: '100%'
  }
}));
// 上記の設定と手動であわせる.
// 自動化できない?
const classNames = ['Section-root', 'Section-item'];

type Props = {
  sections: SectionType[];
  classes?: { [key: string]: string };
};

const SectionList = ({ sections, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  return (
    <Box className={classes['Section-root']}>
      {sections.map((section, i) => (
        <Box key={i} className={classes['Section-item']}>
          <SectionItem
            data={section}
            classes={{ ...inClasses } /* 'Section-*' は除外する?  */}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SectionList;
