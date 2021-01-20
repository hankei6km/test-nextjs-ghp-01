import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SectionItem from './SectionItem';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';
import SectionContext, {
  SectionConfig,
  defaultSectionConfig
} from './SectionContext';

const useStyles = makeStyles(() => ({
  'SectionList-root': {}
}));
// 上記の設定と手動であわせる.
// 自動化できない?
const classNames = ['SectionList-root', 'Section-item'];

type Props = {
  sections: SectionType[];
  config?: SectionConfig;
  classes?: { [key: string]: string };
};

const SectionList = ({
  sections,
  config = defaultSectionConfig(),
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const listNode = (
    <SectionContext.Provider value={config}>
      {sections.map((section, i) => (
        <SectionItem
          key={i}
          data={section}
          classes={{ ...inClasses } /* 'Section-*' は除外する?  */}
        />
      ))}
    </SectionContext.Provider>
  );
  if (config.naked) {
    return listNode;
  }
  return <Box className={classes['SectionList-root']}>{listNode}</Box>;
};

export default SectionList;
