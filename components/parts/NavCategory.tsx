import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SectionContext from '../SectionContext';
import Link from '../Link';
import { pruneClasses } from '../../utils/classes';
import PageContext from '../PageContext';

const useStyles = makeStyles(() => ({
  'NavCategory-root': {
    width: '100%'
  },
  'NavCategory-list': {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    '& li::before': {
      content: '\u200B'
    }
  },
  'NavCategory-link': {
    width: '100%'
  },
  'NavCategory-all-root': {},
  'NavCategory-all-list': {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    '& li::before': {
      content: '\u200B'
    }
  },
  'NavCategory-all-link': {
    // '&:hover': { textDecorationLine: 'none'}
  }
}));
const classNames = [
  'NavCategory-root',
  'NavCategory-list',
  'NavCategory-link',
  'NavCategory-all-root',
  'NavCategory-all-list',
  'NavCategory-all-link'
];

export type NavCategoryComponent = {
  navCategoryComponent: ElementType<any>;
  navAllCategoryComponent: ElementType<any>;
};

type Props = {
  all?: boolean;
  categoryPath: string;
  classes?: { [key: string]: string };
};

const NavCategory = ({
  all = false,
  categoryPath = '',
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { allCategory, category } = useContext(PageContext);
  const { component } = useContext(SectionContext);
  return (
    <Box
      component={
        all ? component.navAllCategoryComponent : component.navCategoryComponent
      }
      className={classes[all ? 'NavCategory-all-root' : 'NavCategory-root']}
    >
      <ul
        className={classes[all ? 'NavCategory-all-list' : 'NavCategory-list']}
      >
        {(all ? allCategory : category).map(({ id, title }) => (
          <Typography
            key={id}
            component="li"
            className={
              classes[all ? 'NavCategory-all-link' : 'NavCategory-link']
            }
          >
            <Link href={`${categoryPath}/[id]`} as={`${categoryPath}/${id}`}>
              {title}
            </Link>
          </Typography>
        ))}
      </ul>
    </Box>
  );
};

export default NavCategory;
